import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, RefreshCw, LogOut, Shield, ArrowLeft } from 'lucide-react';
import { getApiBaseUrl } from '../apiBase.js';

const STORAGE_KEY = 'summercamp_admin_key';

const AdminDashboard = () => {
  const [keyInput, setKeyInput] = useState('');
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem(STORAGE_KEY) || '');
  const [statusFilter, setStatusFilter] = useState('success');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [payload, setPayload] = useState(null);

  const fetchEnrollments = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    setError('');
    try {
      const q = statusFilter === 'success' ? '' : `?status=${encodeURIComponent(statusFilter)}`;
      const base = getApiBaseUrl();
      const url = `${base}/api/admin/enrollments${q}`;
      const res = await fetch(url, {
        headers: { 'X-Admin-Key': adminKey },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401) {
          sessionStorage.removeItem(STORAGE_KEY);
          setAdminKey('');
          setError('Invalid admin key. Please sign in again.');
          return;
        }
        const hint =
          res.status === 404
            ? import.meta.env.DEV
              ? ` Not found (${url}). Start backend on port 5000 with latest code, or fix VITE_API_BASE_URL / restart Vite after vite.config changes.`
              : ` Not found (${url}). Redeploy the backend (App Runner) from latest main so /api/admin exists, and confirm VITE_API_BASE_URL is your backend URL—not the frontend host.`
            : '';
        throw new Error((data.message || `Request failed (${res.status})`) + hint);
      }
      setPayload(data);
    } catch (e) {
      setError(e.message || 'Could not load enrollments.');
      setPayload(null);
    } finally {
      setLoading(false);
    }
  }, [adminKey, statusFilter]);

  useEffect(() => {
    if (adminKey) fetchEnrollments();
  }, [adminKey, statusFilter, fetchEnrollments]);

  const handleUnlock = (e) => {
    e.preventDefault();
    const k = keyInput.trim();
    if (!k) {
      setError('Enter the admin key.');
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, k);
    setAdminKey(k);
    setKeyInput('');
    setError('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAdminKey('');
    setPayload(null);
    setError('');
  };

  const formatDate = (v) => {
    if (!v) return '—';
    try {
      return new Date(v).toLocaleString();
    } catch {
      return String(v);
    }
  };

  if (!adminKey) {
    return (
      <div className="admin-dashboard">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <Shield size={36} className="admin-login-icon" />
            <h1>Admin</h1>
            <p>Enter your admin API key to view enrollments. The key is kept in this browser session only.</p>
          </div>
          <form onSubmit={handleUnlock}>
            {error && <div className="admin-alert admin-alert-error">{error}</div>}
            <label className="admin-label">Admin key</label>
            <input
              type="password"
              className="admin-input"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Same value as ADMIN_API_KEY on the server"
              autoComplete="off"
            />
            <button type="submit" className="btn btn-primary admin-unlock-btn">
              Unlock dashboard
            </button>
          </form>
          <a href="/" className="admin-back-link">
            <ArrowLeft size={16} /> Back to site
          </a>
        </div>
      </div>
    );
  }

  const rows = payload?.enrollments || [];

  return (
    <div className="admin-dashboard admin-dashboard-main">
      <header className="admin-toolbar">
        <div className="admin-toolbar-left">
          <Shield size={22} />
          <h1>Enrollments</h1>
        </div>
        <div className="admin-toolbar-actions">
          <label className="admin-filter-label">
            Status
            <select
              className="admin-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="success">Payment success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="all">All</option>
            </select>
          </label>
          <button
            type="button"
            className="admin-icon-btn"
            onClick={() => fetchEnrollments()}
            disabled={loading}
            title="Refresh"
          >
            <RefreshCw size={18} className={loading ? 'admin-spin' : ''} />
          </button>
          <button type="button" className="admin-btn-outline" onClick={handleLogout}>
            <LogOut size={16} /> Sign out
          </button>
          <a href="/" className="admin-btn-outline admin-link-home">
            Site
          </a>
        </div>
      </header>

      {error && <div className="admin-alert admin-alert-error admin-banner">{error}</div>}

      <div className="admin-stats">
        <span className="admin-stat-pill">
          {loading ? '…' : payload?.count ?? 0} record{payload?.count === 1 ? '' : 's'}
        </span>
        <span className="admin-stat-muted">{payload?.filter}</span>
      </div>

      <div className="admin-table-wrap">
        {loading && !rows.length ? (
          <div className="admin-loading">
            <Loader2 className="admin-spin" size={32} />
          </div>
        ) : rows.length === 0 ? (
          <p className="admin-empty">No enrollments for this filter.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Contact</th>
                <th>Parent</th>
                <th>Grade</th>
                <th>Slot</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Order</th>
                <th>Paid at</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r._id || r.studentId + r.order_no}>
                  <td>
                    <strong>{r.firstName} {r.lastName}</strong>
                    <div className="admin-mono admin-sub">{r.studentId}</div>
                  </td>
                  <td>
                    <div>{r.email}</div>
                    <div className="admin-sub">{r.phone}</div>
                  </td>
                  <td>{r.parentName}</td>
                  <td>{r.grade}</td>
                  <td>{r.slot === 'am' ? 'Morning' : 'Evening'}</td>
                  <td>
                    <span className={`admin-badge admin-badge-${r.status}`}>{r.status}</span>
                  </td>
                  <td>
                    {r.currency} {r.amount}
                  </td>
                  <td className="admin-mono admin-cell-narrow">{r.order_no}</td>
                  <td className="admin-cell-date">{formatDate(r.paidAt)}</td>
                  <td className="admin-cell-date">{formatDate(r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
