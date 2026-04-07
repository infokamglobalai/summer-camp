import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing = ({ countryCode }) => {
  const isIndia = countryCode === 'IN';
  const displayPrice = isIndia ? '₹199' : '$10';

  const features = [
    "Daily programs for full 10 days",
    "Best content from industry experts",
    "Expert feedback on each project",
    "Certificate of Academic Achievement",
    "Reliable support for each child",
    "Fun and collaborative study",
    "Best experiences free content"
  ];
  
  return (
    <section className="pricing-section section mesh-bg" id="pricing">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Investment in Future</h2>
          <p className="section-subtitle">
            Premium AI education made accessible for the next generation of innovators.
          </p>
        </motion.div>
        
        <motion.div 
          className="pricing-card glass"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="pricing-badge-box">
            <motion.span 
              className="pricing-badge"
              animate={{ 
                boxShadow: ["0 0 0px var(--primary-glow)", "0 0 20px var(--primary-glow)", "0 0 0px var(--primary-glow)"] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              BEST VALUE SUMMER 2026
            </motion.span>
          </div>
          
          <div className="pricing-content">
            <motion.div 
              className="price-tag"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {displayPrice}
            </motion.div>
            <p className="price-label">Full 10-Day Camp Access</p>
            <div className="price-split-labels">
              <span className={`price-domestic ${isIndia ? 'active-price' : ''}`}>🇮🇳 India: ₹199</span>
              <span className="price-divider">|</span>
              <span className={`price-intl ${!isIndia ? 'active-price' : ''}`}>🌍 International: $10</span>
            </div>
            
            <ul className="features-list">
              {features.map((feature, i) => (
                <li key={i} className="feature-item">
                  <div className="check-circle glass">
                    <Check size={14} color="white" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <motion.a 
              href="#enroll" 
              className="btn btn-primary pricing-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll Now — {displayPrice}
            </motion.a>
          </div>
        </motion.div>
      </div>

      
    </section>
  );
};

export default Pricing;
