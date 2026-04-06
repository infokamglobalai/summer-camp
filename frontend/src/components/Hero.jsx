import { motion } from 'framer-motion';

const Hero = () => {
  const heroImage = '/hero-summer-camp.jpeg';

  return (
    <section className="hero-section">
      <div className="hero-shell">
        <div className="hero-grid-container">
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="hero-title-refined">
              Master <span className="hero-title-highlight">AI</span> in 10 Days <span aria-hidden="true">🚀</span>
            </h1>
            <p className="hero-subtitle-refined">
              Join our live AI bootcamp and build real-world projects with expert guidance.
            </p>

            <ul className="hero-benefits">
              <li><span aria-hidden="true">🎮</span> Fun &amp; Interactive AI Learning</li>
              <li><span aria-hidden="true">🤖</span> Build Real AI Projects</li>
              <li><span aria-hidden="true">👨‍🏫</span> Guided by Expert Mentors</li>
            </ul>

            <div className="hero-actions-refined">
              <a href="#enroll" className="pill-btn">Enroll Now</a>
              <a href="#program" className="hero-btn-secondary">View Curriculum</a>
            </div>

            <p className="hero-urgency"><span aria-hidden="true">⚡</span> Starts April 15 | Limited Seats</p>
          </motion.div>

          <motion.div
            className="hero-center"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="hero-image-frame">
              <img src={heroImage} alt="Students learning together with a laptop" className="hero-main-portrait" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
