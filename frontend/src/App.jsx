import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBanner from './components/TrustBanner';
import Highlights from './components/Highlights';
import Schedule from './components/Schedule';
import Program from './components/Program';
import CertificateSection from './components/CertificateSection';
import WhyFamilies from './components/WhyFamilies';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import EnrollmentForm from './components/EnrollmentForm';
import Footer from './components/Footer';
import PaymentSuccess from './components/PaymentSuccess';
import AdminDashboard from './components/AdminDashboard';
import FeedbackForm from './components/FeedbackForm';
import FeedbackSuccess from './components/FeedbackSuccess';
import './index.css';

const getPage = () => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/payment-success') return 'payment-success';
  if (path === '/payment-cancel') return 'payment-cancel';
  if (path === '/admin') return 'admin';
  if (path === '/feedback') return 'feedback';
  if (path === '/feedback-success') return 'feedback-success';
  return 'home';
};

function App() {
  const page = getPage();
  const [countryCode, setCountryCode] = useState('IN');

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.country_code) {
          setCountryCode(data.country_code);
        }
      } catch (err) {
        console.warn('IP detection failed, defaulting to India:', err);
      }
    };
    detectCountry();
  }, []);

  // ── Payment Success Page ─────────────────────────────────
  if (page === 'payment-success') return <PaymentSuccess />;

  // ── Admin dashboard ──────────────────────────────────────
  if (page === 'admin') return <AdminDashboard />;

  // ── Feedback Form ────────────────────────────────────────
  if (page === 'feedback') return <FeedbackForm />;

  // ── Feedback Success ─────────────────────────────────────
  if (page === 'feedback-success') return <FeedbackSuccess />;

  // ── Payment Cancelled Page ───────────────────────────────
  if (page === 'payment-cancel') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff1f2', flexDirection: 'column', gap: 20 }}>
      <h2 style={{ color: '#ef4444', fontSize: '2rem' }}>Payment Cancelled</h2>
      <p style={{ color: '#666' }}>Your payment was not completed.</p>
      <a href="/#enroll" style={{ background: '#008A5E', color: 'white', padding: '14px 32px', borderRadius: 50, textDecoration: 'none', fontWeight: 700 }}>Try Again</a>
    </div>
  );

  // ── Main Landing Page ────────────────────────────────────
  return (
    <div className="App">
      <Navbar />
      <Hero countryCode={countryCode} />
      <TrustBanner />
      <Highlights />
      <Schedule />
      <Program />
      <CertificateSection />
      <WhyFamilies />
      <Pricing countryCode={countryCode} />
      <FAQ />
      <EnrollmentForm countryCode={countryCode} />
      <Footer />
    </div>
  );
}

export default App;
