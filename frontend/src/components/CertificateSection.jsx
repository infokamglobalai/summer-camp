import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';

const CertificateSection = () => {
  const certificateImage = '/ai_camp_certificate_mockup_1775546989569.png'; // Handled by generating/copying in actual flow

  return (
    <section className="certificate-section" id="certificate">
      <div className="container">
        <div className="certificate-grid">
          <motion.div 
            className="certificate-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="badge-wrapper">
              <Award className="award-icon" size={32} />
              <span className="badge-text">GLOBAL RECOGNITION</span>
            </div>
            <h2 className="section-title">Earn Your <span className="highlight">Professional AI Explorer</span> Certificate</h2>
            <p className="section-desc">
              Every student who completes the 10-day journey receives an industry-recognized certificate, 
              validating their skills in Prompt Engineering, AI Model Training, and Ethics.
            </p>
            
            <ul className="cert-features">
              <li><CheckCircle size={20} className="check-icon" /> Industry-standard AI credentials</li>
              <li><CheckCircle size={20} className="check-icon" /> Shareable on LinkedIn & Portfolios</li>
              <li><CheckCircle size={20} className="check-icon" /> Verified by EduAi Global Mentors</li>
            </ul>
          </motion.div>

          <motion.div 
            className="certificate-preview"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="cert-frame">
              <img src="/ai_camp_certificate_mockup_1775546989569.png" alt="AI Summer Camp Certificate" className="cert-image" />
              <div className="cert-glow"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
