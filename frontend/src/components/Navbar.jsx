import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled glass' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container nav-container">
        <a href="/" className="logo-group">
          <img src="/logo-eduaitutors.png" alt="EduAiTutors Logo" className="nav-logo-img" />
        </a>

        <div className={`nav-links-desktop ${isOpen ? 'show' : ''}`}>
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#highlights" onClick={() => setIsOpen(false)}>Highlights</a>
          <a href="#schedule" onClick={() => setIsOpen(false)}>Schedule</a>
          <a href="#program" onClick={() => setIsOpen(false)}>10-Day Journey</a>
          <a href="#pricing" onClick={() => setIsOpen(false)}>Pricing</a>
          <a href="/feedback" onClick={() => setIsOpen(false)}>Share your experience</a>
          <a href="#enroll" className="btn btn-primary nav-btn-mobile" onClick={() => setIsOpen(false)}>
            Enroll Now
          </a>
        </div>

        <a href="#enroll" className="btn btn-primary nav-btn-desktop">
          Enroll Now
        </a>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
