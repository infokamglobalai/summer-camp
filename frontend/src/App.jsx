import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Schedule from './components/Schedule';
import Program from './components/Program';
import WhyFamilies from './components/WhyFamilies';
import Pricing from './components/Pricing';
import EnrollmentForm from './components/EnrollmentForm';
import Footer from './components/Footer';
import PaymentSuccess from './components/PaymentSuccess';
import './index.css';

const getPage = () => {
  const path = window.location.pathname;
  if (path === '/payment-success') return 'payment-success';
  if (path === '/payment-cancel') return 'payment-cancel';
  return 'home';
};

function App() {
  const page = getPage();

  // ── Payment Success Page ─────────────────────────────────
  if (page === 'payment-success') return <PaymentSuccess />;

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
      <Hero />
      <Highlights />
      <Schedule />
      <Program />
      <WhyFamilies />
      <Pricing />
      <EnrollmentForm />
      <Footer />
    </div>
  );
}

export default App;
