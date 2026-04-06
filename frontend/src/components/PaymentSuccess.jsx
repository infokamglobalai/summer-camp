import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, AlertCircle, Loader } from 'lucide-react';

const PaymentSuccess = () => {
  // Static view since backend is removed
  const [registration, setRegistration] = useState({
    firstName: 'Student', lastName: '', parentName: 'Parent', email: '...', 
    slot: 'am', grade: '9', amount: '199', registeredAt: new Date().toISOString()
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="success-page-container" style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0; padding: 0; }
          .invoice-card { box-shadow: none !important; border: 1px solid #e2e8f0 !important; margin: 0 !important; width: 100% !important; max-width: none !important; }
          .success-page-container { padding: 0 !important; background: white !important; }
        }
      `}</style>
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ maxWidth: 800, margin: '0 auto' }}>
        
        <div className="no-print" style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ background: '#dcfce7', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={40} color="#008A5E" />
          </div>
          <h1 style={{ color: '#0f172a', fontSize: '2.5rem', fontWeight: 800, marginBottom: 10 }}>Enrollment Confirmed!</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Welcome to the <strong>AI Adventure Camp 2026</strong>. Your seat is officially reserved.</p>
        </div>

        <div className="invoice-card" style={{ background: 'white', borderRadius: 24, boxShadow: '0 40px 100px rgba(0,0,0,0.06)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          {/* Invoice Header */}
          <div style={{ background: '#0f172a', padding: '40px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ color: '#008A5E', fontWeight: 900, fontSize: '1.5rem', marginBottom: 10 }}>EduAiTutors</div>
              <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 400, opacity: 0.8 }}>OFFICIAL E-RECEIPT</h2>
              <div style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: 5 }}>Invoice #: {registration?.paymentId?.slice(-8).toUpperCase() || 'TXN-PND'}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ border: '3px solid #10b981', color: '#10b981', padding: '6px 20px', borderRadius: 8, fontWeight: 900, textTransform: 'uppercase', fontSize: '1.2rem', transform: 'rotate(-5deg)' }}>PAID</div>
            </div>
          </div>

          <div style={{ padding: '50px 40px' }}>
            {/* Meta Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 50 }}>
              <div>
                <h4 style={{ margin: '0 0 10px', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Billed To</h4>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1.1rem' }}>{registration?.parentName}</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{registration?.email}</div>
                {registration?.address && <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: 5 }}>{registration.address}</div>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <h4 style={{ margin: '0 0 10px', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Date Issued</h4>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{registration ? new Date(registration.registeredAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'}</div>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Method: Online Transfer</div>
              </div>
            </div>

            {/* Line Items */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 40 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '15px', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Description</th>
                  <th style={{ textAlign: 'right', padding: '15px', fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '25px 15px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 5 }}>AI Adventure Bootcamp 2026 — 10 Days Journey</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      <strong>Student:</strong> {registration?.firstName} {registration?.lastName} (Grade {registration?.grade})<br />
                      <strong>Time Slot:</strong> {registration?.slot === 'am' ? 'Morning (10AM - 11:30AM)' : 'Evening (6PM - 7:30PM)'}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', padding: '25px 15px', fontWeight: 700, verticalAlign: 'top' }}>₹{registration?.amount}</td>
                </tr>
                <tr>
                  <td style={{ padding: '25px 15px', textAlign: 'right', fontWeight: 400, color: '#64748b' }}>Grand Total</td>
                  <td style={{ textAlign: 'right', padding: '25px 15px', fontWeight: 900, fontSize: '1.4rem', color: '#008A5E' }}>₹{registration?.amount}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '20px', color: '#92400e', fontSize: '0.9rem' }}>
              <strong>Important:</strong> A confirmed welcome email with your student orientation packet has been sent to your inbox. Your live classes start as per the schedule—links will be sent 1 hour before every session.
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px 40px', textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', borderTop: '1px solid #e2e8f0' }}>
            This is a computer-generated receipt. No signature is required. EduAiTutors AI Education India.
          </div>
        </div>

        <div className="no-print" style={{ display: 'flex', gap: 15, justifyContent: 'center', marginTop: 40 }}>
          <button onClick={handlePrint}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#0f172a', color: 'white', border: 'none', padding: '16px 35px', borderRadius: 50, fontWeight: 700, cursor: 'pointer', fontSize: '1rem', transition: 'transform 0.2s' }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'none'}>
            <Download size={20} /> Download Invoice PDF
          </button>
          <a href="/" style={{ display: 'flex', alignItems: 'center', padding: '16px 35px', borderRadius: 50, border: '2px solid #0f172a', color: '#0f172a', textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>
            Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
