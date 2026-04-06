import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShieldCheck, CreditCard, Loader } from 'lucide-react';

const EnrollmentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', parentName: '', email: '', phone: '', childName: '', grade: '6', slot: 'am', address: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const normalizedApiBase = apiBase.replace(/\/+$/, '');
      const response = await fetch(`${normalizedApiBase}/api/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data = null;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response (${response.status}): ${text.slice(0, 120)}`);
      }

      if (!response.ok) {
        setError(data?.message || `Request failed with status ${response.status}.`);
        return;
      }

      if (data.success && data.paymentUrl) {
        // Redirect to Ottu Checkout Page
        window.location.href = data.paymentUrl;
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Enrollment Error:', err);
      setError('Unable to complete enrollment right now. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="enroll-section section" id="enroll">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Quick Enrollment</h2>
          <p className="section-subtitle">Secure your child's spot in the ultimate AI adventure of 2026.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="form-card"
        >
          <div className="form-card-header">
            <div className="header-info">
              <h3>AI Adventure Bootcamp 2026</h3>
              <p>Join 500+ families for 10 days of innovation.</p>
            </div>
            <div className="header-price"><span>₹199</span></div>
          </div>

          <div className="form-body">
            {error && (
              <div style={{ background: '#fee2e2', border: '1px solid #f87171', borderRadius: 12, padding: '12px 16px', marginBottom: 20, color: '#991b1b', fontSize: '0.9rem' }}>
                ⚠️ {error}
              </div>
            )}

            <motion.form onSubmit={handleSubmit} key="form">
              <div className="form-grid">
                <div className="input-group">
                  <label>First Name</label>
                  <input name="firstName" type="text" required placeholder="Student's First Name" value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input name="lastName" type="text" required placeholder="Student's Last Name" value={formData.lastName} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input name="email" type="email" required placeholder="example@mail.com" value={formData.email} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input name="phone" type="tel" required placeholder="+91 XXXX XXXX" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Parent Name</label>
                  <input name="parentName" type="text" required placeholder="Full Name" value={formData.parentName} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Child's Grade</label>
                  <select name="grade" value={formData.grade} onChange={handleChange}>
                    {[6,7,8,9,10,11,12].map(g => <option key={g} value={g}>Grade {g}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>Time Slot</label>
                  <select name="slot" value={formData.slot} onChange={handleChange}>
                    <option value="am">Morning (10AM - 11:30AM)</option>
                    <option value="pm">Evening (6PM - 7:30PM)</option>
                  </select>
                </div>
                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                  <label>Address (Optional)</label>
                  <input name="address" type="text" placeholder="Your current city or address" value={formData.address} onChange={handleChange} />
                </div>
              </div>

              <div className="form-footer">
                <div className="trust-badges">
                  <span><ShieldCheck size={16} /> Secure Payment</span>
                  <span><CreditCard size={16} /> Powered by Ottu</span>
                </div>
                <button type="submit" className="btn btn-primary form-btn" disabled={loading}>
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                      <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                      Redirecting to Payment...
                    </span>
                  ) : 'Continue to Payment — ₹199'}
                </button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnrollmentForm;
