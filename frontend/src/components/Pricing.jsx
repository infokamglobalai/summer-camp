import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing = () => {
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
    <section className="pricing-section section" id="pricing">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Pricing</h2>
          <p className="section-subtitle">
            Plan pricing for child can find matching in standard.
          </p>
        </div>
        
        <motion.div 
          className="pricing-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="pricing-badge-box">
            <span className="pricing-badge">BEST VALUE SUMMER 2026</span>
          </div>
          
          <div className="pricing-content">
            <div className="price-tag">₹199</div>
            <p className="price-label">Full 10-Day Camp Access</p>
            <p className="price-label">One-time For Camp Fee</p>
            
            <ul className="features-list">
              {features.map((feature, i) => (
                <li key={i} className="feature-item">
                  <div className="check-circle">
                    <Check size={14} color="white" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <a href="#enroll" className="btn btn-primary pricing-btn">
              Enroll Now — ₹199
            </a>
          </div>
        </motion.div>
      </div>

      
    </section>
  );
};

export default Pricing;
