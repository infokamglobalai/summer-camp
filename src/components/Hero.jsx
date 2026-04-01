import { motion } from 'framer-motion';

const Hero = () => {
  const heroImage = '/hero_portrait_green.png';

  return (
    <section className="hero-section">
      {/* Background Layer: Huge Bold Text & Curved Shape */}
      <div className="hero-backdrop-shape"></div>
      <div className="hero-bg-text-wrap">
        <h2 className="hero-bg-boot">BOOT</h2>
        <h2 className="hero-bg-camp">CAMP</h2>
      </div>

      {/* 3-Column Grid: [Text | Portrait | Card] */}
      <div className="container hero-grid-container">

        {/* LEFT: Text Content */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="hero-title-refined">
            AI Adventure<br />bootcamp
          </h1>
          <p className="hero-by-line">by eduaitutors</p>
          <p className="hero-subtitle-refined">
            Master artificial intelligence this summer.<br />
            Enroll in our 10-day intensive journey.
          </p>
          <div className="hero-actions-refined">
            <a href="#enroll" className="pill-btn">
              <span>Enroll Now</span>
              <span className="arrow-box">→</span>
            </a>
          </div>
        </motion.div>

        {/* CENTER: Portrait Image */}
        <motion.div
          className="hero-center"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={heroImage} alt="AI Bootcamp Hero" className="hero-main-portrait" />
        </motion.div>

        {/* RIGHT: Mini Pricing Card */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="hero-mini-card-refined">
            <div className="mini-card-img-box">
              <img src="/ai_art_explosion.png" alt="Card Preview" />
            </div>
            <div className="mini-card-text">
              <h4>AI Adventure</h4>
              <p>₹199 <span>₹499</span></p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
