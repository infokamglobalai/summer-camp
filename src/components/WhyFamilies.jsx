import { motion } from 'framer-motion';
import { Users, Award, Heart, Rocket } from 'lucide-react';

const WhyFamilies = () => {
  const benefits = [
    {
      title: "Expert Mentorship",
      desc: "Learn from experienced AI professionals and educators",
      icon: <Users size={24} />,
      color: "#008A5E"
    },
    {
      title: "Certificate of Achievement",
      desc: "Every camper receives a certificate and portfolio of work",
      icon: <Award size={24} />,
      color: "#008A5E"
    },
    {
      title: "Safe & Fun Environment",
      desc: "Small groups, personalized attention, and age-appropriate content",
      icon: <Heart size={24} />,
      color: "#008A5E"
    },
    {
      title: "Future-Ready Skills",
      desc: "Build confidence in technology and creative problem-solving",
      icon: <Rocket size={24} />,
      color: "#008A5E"
    }
  ];

  return (
    <section className="why-section section" id="why">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Families Love It</h2>
          <p className="section-subtitle">
            Trusted by parents, loved by kids—here's what makes our camp special
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className="benefit-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="benefit-icon-box" style={{ backgroundColor: benefit.color, color: 'white' }}>
                {benefit.icon}
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-desc">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyFamilies;
