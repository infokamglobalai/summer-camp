import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShieldCheck, CreditCard, Loader, Globe } from 'lucide-react';
import { getApiBaseUrl } from '../apiBase.js';
import { Country, State, City } from 'country-state-city';

const EnrollmentForm = ({ countryCode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Dynamic location states
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Load countries on mount safely
  useEffect(() => {
    try {
      if (Country && typeof Country.getAllCountries === 'function') {
        setCountries(Country.getAllCountries());
      }
    } catch (err) {
      console.error('Error loading countries:', err);
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    parentName: '',
    email: '',
    phone: '',
    grade: '6',
    slot: 'Morning (10AM - 11:30AM)',
    country: countryCode || 'IN', 
    state: '',
    city: '',
    address: ''
  });

  // Derived country label for backend
  const selectedCountry = countries.find(c => c.isoCode === formData.country);
  const countryName = selectedCountry?.name || 'India';
  const isIndia = formData.country === 'IN';
  const displayPrice = isIndia ? '₹199' : '$10';

  // Sync with prop if it changes
  useEffect(() => {
    if (countryCode && !formData.firstName) { // Only auto-switch if user hasn't started typing or just on mount
      setFormData(prev => ({ ...prev, country: countryCode }));
    }
  }, [countryCode]);

  // 2. Handle Location filtering
  useEffect(() => {
    if (!formData.country) return;
    try {
      if (State && typeof State.getStatesOfCountry === 'function') {
        const s = State.getStatesOfCountry(formData.country);
        setStates(s || []);
        setFormData(prev => ({ ...prev, state: s?.[0]?.isoCode || '', city: '' }));
      }
    } catch (err) {
      console.error('Error loading states:', err);
    }
  }, [formData.country]);

  useEffect(() => {
    if (!formData.country || !formData.state) return;
    try {
      if (City && typeof City.getCitiesOfState === 'function') {
        const c = City.getCitiesOfState(formData.country, formData.state);
        setCities(c || []);
        setFormData(prev => ({ ...prev, city: c?.[0]?.name || '' }));
      }
    } catch (err) {
      console.error('Error loading cities:', err);
    }
  }, [formData.country, formData.state]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const normalizedApiBase = getApiBaseUrl();
      const payload = {
        ...formData,
        country: countryName,
        countryCode: formData.country,
        state: states.find(s => s.isoCode === formData.state)?.name || formData.state,
      };

      const response = await fetch(`${normalizedApiBase}/api/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    <section className="enroll-section section mesh-bg" id="enroll">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Enrolment Form</h2>
          <p className="section-subtitle">Secure your child's spot in the ultimate AI adventure of 2026.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="form-card glass"
        >
          <div className="form-card-header">
            <div className="header-info">
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                AI Adventure Bootcamp 2026
              </motion.h3>
              <p>Join 500+ families for 10 days of innovation.</p>
            </div>
            <div className="header-price">
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              >
                {displayPrice}
              </motion.span>
            </div>
          </div>

          <div className="form-body">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: '#fee2e2', border: '1px solid #f87171', borderRadius: 12, padding: '12px 16px', marginBottom: 20, color: '#991b1b', fontSize: '0.9rem' }}
              >
                ⚠️ {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
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
                  <label>Email ID</label>
                  <input name="email" type="email" required placeholder="example@mail.com" value={formData.email} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+1 234 567 890"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="phone-input-fallback"
                  />
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
                  <label>Country</label>
                  <select name="country" value={formData.country} onChange={handleChange} required>
                    {countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>State / Province</label>
                  <select name="state" value={formData.state} onChange={handleChange} required>
                    <option value="">Select State</option>
                    {states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>City</label>
                  <select name="city" value={formData.city} onChange={handleChange} required>
                    <option value="">Select City</option>
                    {cities.length > 0 ? (
                      cities.map(c => <option key={`${c.name}-${c.latitude}`} value={c.name}>{c.name}</option>)
                    ) : (
                      <option value={formData.city}>{formData.city || 'Select City'}</option>
                    )}
                  </select>
                </div>
                <div className="input-group">
                  <label>Time Slot (IST Time Zone)</label>
                  <select name="slot" value={formData.slot} onChange={handleChange}>
                    <option value="Morning (10AM - 11:30AM)">Morning (10AM - 11:30AM)</option>
                    <option value="Evening (6PM - 7:30PM)">Evening (6PM - 7:30PM)</option>
                  </select>
                </div>

                <div className="input-group address-group">
                  <label>Address</label>
                  <input name="address" type="text" required placeholder="Street address or locality" value={formData.address} onChange={handleChange} />
                </div>
              </div>

              <div className="form-footer">
                <div className="trust-badges">
                  <span><ShieldCheck size={16} /> Secure Payment</span>
                  <span><Globe size={16} /> Auto-Pricing Active</span>
                  <span><CreditCard size={16} /> Powered by Ottu</span>
                </div>
                <motion.button 
                  type="submit" 
                  className="btn btn-primary form-btn" 
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                      <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                      Redirecting...
                    </span>
                  ) : `Continue to Payment — ${displayPrice}`}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnrollmentForm;
