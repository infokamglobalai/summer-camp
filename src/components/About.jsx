import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, GraduationCap, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
  const cards = [
    {
      icon: <Smartphone size={24} className="icon-emerald" />,
      title: "Hands-on AI & Code learning",
      bgColor: "#E6FAF4"
    },
    {
      icon: <GraduationCap size={24} className="icon-blue" />,
      title: "Best Content from Industry Experts",
      bgColor: "#F0F3FF"
    },
    {
      icon: <Zap size={24} className="icon-purple" />,
      title: "Build Real-world AI Innovation",
      bgColor: "#FDF2FF"
    },
    {
      icon: <ShieldCheck size={24} className="icon-green" />,
      title: "Safe and Supportive Learning Environment",
      bgColor: "#F0FFF4"
    }
  ];

  return (
    <section className="about-section section" id="about">
      <div className="container">
        <div className="about-header section-header">
          <h2 className="about-title">About the Camp</h2>
          <p className="about-desc">
            Discover the magic of AI. Let your child become a creator, builder, and innovator in our fun, hands-on summer adventure. Our camp is designed to ignite curiosity and foster essential skills for the future.
          </p>
        </div>

        <div className="about-grid">
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              className="about-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="card-icon-box" style={{ backgroundColor: card.bgColor }}>
                {card.icon}
              </div>
              <h3 className="card-title">{card.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .about-section {
          background-color: var(--white);
          text-align: center;
        }
        .section-header {
          max-width: 800px;
          margin: 0 auto 60px;
        }
        .about-title {
          font-size: 2.5rem;
          color: var(--text-main);
          margin-bottom: 24px;
        }
        .about-desc {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .about-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }
        .about-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px 32px;
          background-color: var(--white);
          border-radius: var(--radius-md);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.05);
          text-align: left;
        }
        .card-icon-box {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.3;
        }
        .icon-emerald { color: #008A5E; }
        .icon-blue { color: #3182CE; }
        .icon-purple { color: #805AD5; }
        .icon-green { color: #38A169; }

        @media (max-width: 640px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .about-title { font-size: 2rem; }
        }
      `}</style>
    </section>
  );
};

export default About;
