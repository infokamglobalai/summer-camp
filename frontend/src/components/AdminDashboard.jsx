import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, RefreshCw, LogOut, Shield, ArrowLeft, Users, MessageSquare } from 'lucide-react';
import { getApiBaseUrl } from '../apiBase.js';
import './AdminFeedback.css';

const STORAGE_KEY = 'summercamp_admin_key';

const AdminDashboard = () => {
  const [keyInput, setKeyInput] = useState('');
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem(STORAGE_KEY) || '');
  const [view, setView] = useState('enrollments'); // 'enrollments' or 'feedbacks'
  const [statusFilter, setStatusFilter] = useState('success');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [payload, setPayload] = useState(null);
  const [feedbacksPayload, setFeedbacksPayload] = useState(null);

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
        throw new Error(data.message || `Request failed (${res.status})`);
      }
      setPayload(data);
    } catch (e) {
      setError(e.message || 'Could not load enrollments.');
      setPayload(null);
    } finally {
      setLoading(false);
    }
  }, [adminKey, statusFilter]);

  const fetchFeedbacks = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    setError('');
    try {
      const base = getApiBaseUrl();
      const url = `${base}/api/feedback`;
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
        throw new Error(data.message || `Request failed (${res.status})`);
      }
      setFeedbacksPayload(data);
    } catch (e) {
      setError(e.message || 'Could not load feedbacks.');
      setFeedbacksPayload(null);
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    if (adminKey) {
      if (view === 'enrollments') fetchEnrollments();
      else fetchFeedbacks();
    }
  }, [adminKey, statusFilter, view, fetchEnrollments, fetchFeedbacks]);

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
    setFeedbacksPayload(null);
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
            <p>Enter your admin API key to view dashboard. The key is kept in this browser session only.</p>
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

  const enrollmentRows = payload?.enrollments || [];
  const feedbackRows = feedbacksPayload?.feedbacks || [];

  return (
    <div className="admin-dashboard admin-dashboard-main">
      <header className="admin-toolbar">
        <div className="admin-toolbar-left">
          <Shield size={22} />
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-toolbar-actions">
          {view === 'enrollments' && (
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
          )}
          <button
            type="button"
            className="admin-icon-btn"
            onClick={() => view === 'enrollments' ? fetchEnrollments() : fetchFeedbacks()}
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

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${view === 'enrollments' ? 'active' : ''}`}
          onClick={() => setView('enrollments')}
        >
          <Users size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          Enrollments ({payload?.count || 0})
        </button>
        <button 
          className={`admin-tab ${view === 'feedbacks' ? 'active' : ''}`}
          onClick={() => setView('feedbacks')}
        >
          <MessageSquare size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          Student Feedbacks ({feedbacksPayload?.count || 0})
        </button>
      </div>

      {view === 'enrollments' ? (
        <div className="admin-table-wrap">
          {loading && !enrollmentRows.length ? (
            <div className="admin-loading">
              <Loader2 className="admin-spin" size={32} />
            </div>
          ) : enrollmentRows.length === 0 ? (
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
                {enrollmentRows.map((r) => (
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
      ) : (
        <div className="admin-feedback-view">
          {loading && !feedbackRows.length ? (
            <div className="admin-loading">
              <Loader2 className="admin-spin" size={32} />
            </div>
          ) : feedbackRows.length === 0 ? (
            <p className="admin-empty">No feedbacks submitted yet.</p>
          ) : (
            <div className="feedback-grid">
              {feedbackRows.map((f) => (
                <div key={f._id} className="feedback-admin-card">
                  <div className="card-header">
                    <div>
                      <h3>{f.name}</h3>
                      <span className="grade">{f.grade}</span>
                    </div>
                    <span className="date">{formatDate(f.createdAt)}</span>
                  </div>
                  
                  <div className="card-section">
                    <strong>Can use on website:</strong> {f.canUseOnWebsite}
                  </div>

                  <div className="card-section">
                    <h4>🟡 Before Joining</h4>
                    <p><strong>Thought AI:</strong> {f.beforeJoining?.thoughtAboutAI || '—'}</p>
                    <p><strong>Reason:</strong> {f.beforeJoining?.reasonForJoining || '—'}</p>
                  </div>

                  <div className="card-section">
                    <h4>🔵 During Bootcamp</h4>
                    <p><strong>Enjoyed:</strong> {f.duringBootcamp?.enjoyedMost || '—'}</p>
                    <p><strong>Best Activity:</strong> {f.duringBootcamp?.bestActivity || '—'}</p>
                    <p><strong>Easy:</strong> {f.duringBootcamp?.classEasy} {f.duringBootcamp?.whyEasy ? `(${f.duringBootcamp.whyEasy})` : ''}</p>
                  </div>

                  <div className="card-section">
                    <h4>🟣 After Bootcamp</h4>
                    <p><strong>Learned:</strong> {f.afterBootcamp?.learnedThings || '—'}</p>
                    <p><strong>Created:</strong> {f.afterBootcamp?.coolCreation || '—'}</p>
                    <p><strong>Confidence:</strong> {f.afterBootcamp?.confidence || '—'}</p>
                  </div>

                  <div className="card-section">
                    <h4>🔴 Fun + Honest</h4>
                    <p><strong>Moment:</strong> {f.funFeedback?.favoriteMoment || '—'}</p>
                    <p><strong>Change:</strong> {f.funFeedback?.oneChange || '—'}</p>
                  </div>

                  <div className="card-section highlight">
                    <h4>⭐ Testimonial</h4>
                    <p>“This AI bootcamp is awesome because {f.testimonial}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
