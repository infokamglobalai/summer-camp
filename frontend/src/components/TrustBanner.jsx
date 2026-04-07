import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, FlaskConical, GraduationCap, Cloud } from 'lucide-react';

const TrustBanner = () => {
  const partners = [
    { name: 'FUTURE AI', icon: <Cpu size={24} /> },
    { name: 'EDUGLOBAL', icon: <Globe size={24} /> },
    { name: 'TESTLABS', icon: <FlaskConical size={24} /> },
    { name: 'STEM ACADEMY', icon: <GraduationCap size={24} /> },
    { name: 'CLOUDLEARN', icon: <Cloud size={24} /> },
  ];

  return (
    <section className="trust-banner">
      <div className="container">
        <p className="trust-label">PARTNERING WITH GLOBAL LEADERS IN AI EDUCATION</p>
        <div className="logo-track">
          {partners.concat(partners).concat(partners).map((partner, index) => (
            <div key={index} className="logo-item">
              <span className="logo-icon">{partner.icon}</span>
              <span className="logo-name">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;

