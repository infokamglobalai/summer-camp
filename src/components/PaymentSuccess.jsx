import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, AlertCircle, Loader } from 'lucide-react';

const API = 'http://localhost:5000/api';

const PaymentSuccess = () => {
  const [status, setStatus] = useState('verifying'); // verifying | success | failed
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const session_id = params.get('session_id') || params.get('order_no');
      const registrationId = sessionStorage.getItem('registrationId');

      if (!session_id && !registrationId) {
        setStatus('failed');
        return;
      }

      try {
        const res = await fetch(`${API}/payment/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id, registrationId })
        });
        const data = await res.json();

        if (data.success && data.status === 'paid') {
          setRegistration(data.registration);
          setStatus('success');
          sessionStorage.removeItem('registrationId');
        } else {
          setStatus('failed');
        }
      } catch {
        setStatus('failed');
      }
    };

    verify();
  }, []);

  const downloadReceipt = () => {
    if (!registration) return;
    const r = registration;
    const date = new Date(r.registeredAt).toLocaleString('en-IN');
    const content = `
AI ADVENTURE CAMP 2026 — PAYMENT RECEIPT
==========================================
Parent Name  : ${r.parentName}
Email        : ${r.email}
Student      : ${r.childName}
Grade        : ${r.grade}
Time Slot    : ${r.slot === 'am' ? 'Morning (10AM-1PM)' : 'Evening (2PM-5PM)'}
Amount Paid  : ₹${r.amount}
Payment ID   : ${r.paymentId || 'N/A'}
Date         : ${date}
Status       : PAID ✅
==========================================
EduAiTutors | itsupport@eduaitutors.com
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Camp-Receipt-${r.childName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (status === 'verifying') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0fdf4' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
        <Loader size={60} color="#008A5E" style={{ animation: 'spin 1s linear infinite', marginBottom: 24 }} />
        <h2 style={{ color: '#008A5E' }}>Verifying your payment...</h2>
        <p style={{ color: '#666' }}>Please wait, do not close this window.</p>
      </motion.div>
    </div>
  );

  if (status === 'failed') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff1f2' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', background: 'white', padding: 60, borderRadius: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.1)', maxWidth: 500 }}>
        <AlertCircle size={80} color="#ef4444" style={{ marginBottom: 24 }} />
        <h2 style={{ color: '#ef4444', marginBottom: 16 }}>Payment Not Confirmed</h2>
        <p style={{ color: '#666', marginBottom: 32 }}>Your payment could not be verified. If money was deducted, please contact us at <strong>itsupport@eduaitutors.com</strong></p>
        <a href="/#enroll" style={{ background: '#008A5E', color: 'white', padding: '14px 32px', borderRadius: 50, textDecoration: 'none', fontWeight: 700 }}>Try Again</a>
      </motion.div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
        style={{ background: 'white', borderRadius: 24, padding: '50px 40px', maxWidth: 560, width: '100%', boxShadow: '0 30px 80px rgba(0,0,0,0.1)', textAlign: 'center' }}>

        <CheckCircle size={90} color="#008A5E" style={{ marginBottom: 20 }} />
        <h1 style={{ color: '#008A5E', fontSize: '2rem', marginBottom: 8 }}>Payment Successful! 🎉</h1>
        <p style={{ color: '#666', marginBottom: 32 }}>Welcome to AI Adventure Camp 2026!</p>

        {registration && (
          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 16, padding: '24px', textAlign: 'left', marginBottom: 28 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <tbody>
                {[
                  ['Student', registration.childName],
                  ['Grade', registration.grade],
                  ['Slot', registration.slot === 'am' ? 'Morning (10AM – 1PM)' : 'Evening (2PM – 5PM)'],
                  ['Amount Paid', `₹${registration.amount}`],
                  ['Payment ID', registration.paymentId || 'N/A'],
                ].map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: '1px solid #dcfce7' }}>
                    <td style={{ padding: '10px 8px', color: '#666' }}>{label}</td>
                    <td style={{ padding: '10px 8px', fontWeight: 700, color: '#1a1a1a' }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ background: '#fefce8', border: '1px solid #fde047', borderRadius: 12, padding: '14px 18px', marginBottom: 28, fontSize: '0.9rem', textAlign: 'left', color: '#713f12' }}>
          📧 A welcome email and receipt have been sent to <strong>{registration?.email}</strong>.<br />
          📅 Your <strong>live class link</strong> will be emailed to you every day before your session starts.
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={downloadReceipt}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#008A5E', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 50, fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            <Download size={18} /> Download Receipt
          </button>
          <a href="/" style={{ display: 'flex', alignItems: 'center', padding: '14px 28px', borderRadius: 50, border: '2px solid #008A5E', color: '#008A5E', textDecoration: 'none', fontWeight: 700 }}>
            Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
