import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Clock, XCircle, LogOut, Download, Search, RefreshCw } from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const AdminDashboard = ({ onLogout }) => {
  const [stats, setStats] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const token = localStorage.getItem('adminToken');
  const adminEmail = localStorage.getItem('adminEmail');

  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, regsRes] = await Promise.all([
        fetch(`${API}/admin/stats`, { headers }),
        fetch(`${API}/admin/registrations?status=${statusFilter}&search=${search}`, { headers })
      ]);
      const statsData = await statsRes.json();
      const regsData = await regsRes.json();
      setStats(statsData);
      setRegistrations(regsData.registrations || []);
      setTotal(regsData.total || 0);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleExport = () => {
    window.open(`${API}/admin/export`, '_blank');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    onLogout();
  };

  const statCards = stats ? [
    { label: 'Total Registrations', value: stats.total, icon: <Users size={24} />, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Paid Students', value: stats.paid, icon: <Users size={24} />, color: '#008A5E', bg: '#f0fdf4' },
    { label: 'Total Revenue', value: `₹${stats.revenue}`, icon: <DollarSign size={24} />, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Pending', value: stats.pending, icon: <Clock size={24} />, color: '#6366f1', bg: '#eef2ff' },
  ] : [];

  const slotLabel = (slot) => slot === 'am' ? 'Morning' : 'Evening';
  const statusStyle = (s) => ({
    padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700,
    background: s === 'paid' ? '#dcfce7' : s === 'pending' ? '#fef3c7' : '#fee2e2',
    color: s === 'paid' ? '#166534' : s === 'pending' ? '#92400e' : '#991b1b'
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Navbar */}
      <div style={{ background: '#012A5E', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/logo-eduaitutors.png" alt="logo" style={{ height: 44 }} />
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Admin Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{adminEmail}</span>
          <button onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
          {statCards.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: s.bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters + Actions */}
        <div style={{ background: 'white', borderRadius: 16, padding: '20px 24px', marginBottom: 20, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f8fafc', border: '1px solid #e0e0e0', borderRadius: 10, padding: '0 14px', flex: 1 }}>
              <Search size={16} color="#666" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, phone..."
                style={{ border: 'none', background: 'none', padding: '10px 0', fontSize: '0.9rem', outline: 'none', width: '100%' }} />
            </div>
            <button type="submit" style={{ background: '#008A5E', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Search</button>
          </form>

          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #e0e0e0', fontSize: '0.9rem', background: '#f8fafc', cursor: 'pointer' }}>
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <button onClick={fetchData} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f0fdf4', border: '1px solid #86efac', color: '#008A5E', padding: '10px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>
            <RefreshCw size={16} /> Refresh
          </button>

          <button onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#012A5E', color: 'white', border: 'none', padding: '10px 18px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* Table */}
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>Registrations ({total})</h3>
          </div>

          {loading ? (
            <div style={{ padding: 60, textAlign: 'center', color: '#666' }}>Loading...</div>
          ) : registrations.length === 0 ? (
            <div style={{ padding: 60, textAlign: 'center', color: '#666' }}>No registrations found.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    {['#', 'Parent', 'Email', 'Phone', 'Child', 'Grade', 'Slot', 'Amount', 'Payment ID', 'Status', 'Date'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, color: '#666', whiteSpace: 'nowrap', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((r, i) => (
                    <tr key={r._id} style={{ borderBottom: '1px solid #f9f9f9', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                      <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#666' }}>{i + 1}</td>
                      <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: '0.9rem' }}>{r.parentName}</td>
                      <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#666' }}>{r.email}</td>
                      <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#666' }}>{r.phone}</td>
                      <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: '0.9rem' }}>{r.childName}</td>
                      <td style={{ padding: '14px 16px', fontSize: '0.85rem', textAlign: 'center' }}>{r.grade}</td>
                      <td style={{ padding: '14px 16px', fontSize: '0.85rem' }}>{slotLabel(r.slot)}</td>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: '#008A5E' }}>₹{r.amount}</td>
                      <td style={{ padding: '14px 16px', fontSize: '0.75rem', color: '#666', fontFamily: 'monospace' }}>{r.ottuPaymentId || '—'}</td>
                      <td style={{ padding: '14px 16px' }}><span style={statusStyle(r.status)}>{(r.status || 'pending').toUpperCase()}</span></td>
                      <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: '#666', whiteSpace: 'nowrap' }}>{new Date(r.registeredAt).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
