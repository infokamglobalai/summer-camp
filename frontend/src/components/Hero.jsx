import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

const Hero = ({ countryCode }) => {
  const heroImage = '/hero-summer-camp.jpeg';
  const isIndia = countryCode === 'IN';
  const displayPrice = isIndia ? '₹199' : '$10';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="hero-section mesh-bg">
      <div className="hero-shell">
        <div className="hero-grid-container">
          <motion.div
            className="hero-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="hero-badge">
              <Sparkles size={16} color="#008A5E" /> <span>Next Batch: April 27</span>
            </motion.div>

            <motion.h1 className="hero-title-refined" variants={itemVariants}>
              Empower Your <span className="hero-title-highlight">AI Future</span> in 10 Days
            </motion.h1>

            <motion.p className="hero-subtitle-refined" variants={itemVariants}>
              Unlock the power of Artificial Intelligence through hands-on projects, 
              live mentorship, and a global community of young innovators.
              <span className="hero-global-badge">🌍 Join students from 10+ countries!</span>
            </motion.p>

            <motion.ul className="hero-benefits" variants={itemVariants}>
              <li><Star size={18} className="star-icon" /> <span>Build Real-World AI Applications</span></li>
              <li><Star size={18} className="star-icon" /> <span>Learn from Industry Pioneers</span></li>
              <li><Star size={18} className="star-icon" /> <span>Earn a Global Certificate</span></li>
            </motion.ul>

            <motion.div className="hero-actions-refined" variants={itemVariants}>
              <a href="#enroll" className="pill-btn">Start Learning — {displayPrice}</a>
              <a href="#program" className="hero-btn-secondary">Explore Curriculum</a>
            </motion.div>

            <motion.p className="hero-urgency" variants={itemVariants}>
              Register now to join 500+ successful alumni.
            </motion.p>
          </motion.div>

          <motion.div
            className="hero-center"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              className="hero-image-frame"
              animate={floatAnimation}
              whileHover={{ scale: 1.02 }}
            >
              <img src={heroImage} alt="Students learning AI" className="hero-main-portrait" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
