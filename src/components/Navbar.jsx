import React, { useState } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
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
    </nav>
  );
};

export default Navbar;
