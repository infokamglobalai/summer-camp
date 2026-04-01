import { motion } from 'framer-motion';
import { Bot, Palette, Lightbulb, Trophy } from 'lucide-react';

const Highlights = () => {
  const highlights = [
    {
      title: "Discovering AI",
      desc: "Explore how AI works through fun, interactive sessions and real-world examples that spark curiosity.",
      image: "/discovering_ai.png",
      icon: <Bot size={20} />,
      bgColor: "#E6FAF4"
    },
    {
      title: "AI Art Explosion",
      desc: "Create stunning digital artwork using AI tools—paint, design, and bring your imagination to life!",
      image: "/ai_art_explosion.png",
      icon: <Palette size={20} />,
      bgColor: "#F0F3FF"
    },
    {
      title: "Design Your AI Innovation",
      desc: "Build your own AI project from scratch and solve real problems with creative technology solutions.",
      image: "/ai_innovation_design.png",
      icon: <Lightbulb size={20} />,
      bgColor: "#FDF2FF"
    },
    {
      title: "AI Innovation Showcase",
      desc: "Present your creations to families and peers—celebrate achievements and take home your projects!",
      image: "/ai_innovation_showcase.png",
      icon: <Trophy size={20} />,
      bgColor: "#F0FFF4"
    }
  ];

  return (
    <section className="highlights-section section" id="highlights">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Program Highlights</h2>
          <p className="section-subtitle">
            Four exciting learning pathways designed to ignite creativity and innovation
          </p>
        </div>

        <div className="highlights-grid">
          {highlights.map((item, index) => (
            <motion.div 
              key={index}
              className="highlight-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card-image-box">
                <img src={item.image} alt={item.title} className="card-image" />
                <div className="card-badge" style={{ backgroundColor: item.bgColor }}>
                  {item.icon}
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-highlight-title">{item.title}</h3>
                <p className="card-highlight-desc">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      
    </section>
  );
};

export default Highlights;
