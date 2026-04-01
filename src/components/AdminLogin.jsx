import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminEmail', data.email);
      onLogin();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #012A5E 0%, #008A5E 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'white', borderRadius: 24, padding: '50px 40px', maxWidth: 420, width: '100%', boxShadow: '0 40px 100px rgba(0,0,0,0.3)' }}>

        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 64, height: 64, background: '#012A5E', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={28} color="white" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#012A5E', marginBottom: 6 }}>Admin Portal</h1>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>AI Adventure Camp 2026</p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #f87171', borderRadius: 10, padding: '12px 16px', marginBottom: 20, color: '#991b1b', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem', color: '#333' }}>Email</label>
            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="admin@eduaitutors.com"
              style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid #e0e0e0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: 28, position: 'relative' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem', color: '#333' }}>Password</label>
            <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              style={{ width: '100%', padding: '14px 48px 14px 16px', borderRadius: 12, border: '1.5px solid #e0e0e0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }} />
            <button type="button" onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: 16, top: 40, background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '16px', background: '#008A5E', color: 'white', border: 'none', borderRadius: 50, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {loading ? 'Signing in...' : <><LogIn size={18} /> Sign In</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
