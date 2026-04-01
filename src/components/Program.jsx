import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Palette, Zap, BookOpen, UserCheck, Briefcase, GraduationCap, Lightbulb, Trophy } from 'lucide-react';

const Program = () => {
  const days = [
    {
      day: 1,
      title: "Discovering AI",
      desc: "What is AI? How does it change your daily life? Fun experiments and icebreakers to kick off the camp!",
      icon: <Bot size={24} className="icon-orange" />,
      color: "#FF8C00",
      image: "/journey/day1.png"
    },
    {
      day: 2,
      title: "Talking to AI",
      desc: "Have real conversations with AI tools! Understand how chatbots comprehend our language and respond.",
      icon: <MessageSquare size={24} className="icon-navy" />,
      color: "#0A47A3",
      image: "/journey/day2.png"
    },
    {
      day: 3,
      title: "AI Art Explosion",
      desc: "Create stunning AI-generated artwork! Learn how AI makes images from words and build your own gallery.",
      icon: <Palette size={24} className="icon-orange" />,
      color: "#FF8C00",
      image: "/journey/day3.png"
    },
    {
      day: 4,
      title: "Prompt Power-Ups",
      desc: "Master the art of prompting! Get AI to write, create, and solve exactly what you want using clever techniques.",
      icon: <Zap size={24} className="icon-navy" />,
      color: "#0A47A3",
      image: "/journey/day4.png"
    },
    {
      day: 5,
      title: "Storytelling with AI",
      desc: "Co-write amazing stories with AI as your creative partner. Explore unique plots, characters, and worlds together!",
      icon: <BookOpen size={24} className="icon-orange" />,
      color: "#FF8C00",
      image: "/journey/day5.png"
    },
    {
      day: 6,
      title: "Story to Comics!",
      desc: "Transform your AI story into a full comic strip! Use AI art tools to bring panels and characters to life.",
      icon: <UserCheck size={24} className="icon-navy" />,
      color: "#0A47A3",
      image: "/journey/day6.png"
    },
    {
      day: 7,
      title: "AI & Your Future Career",
      desc: "Discover how AI is shaping jobs! Explore exciting careers in tech, healthcare, and art with AI skills.",
      icon: <Briefcase size={24} className="icon-orange" />,
      color: "#FF8C00",
      image: "/journey/day7.png"
    },
    {
      day: 8,
      title: "Smart School Projects",
      desc: "Use AI to supercharge your assignments! Research faster, present better, and impress your teachers.",
      icon: <GraduationCap size={24} className="icon-navy" />,
      color: "#0A47A3",
      image: "/journey/day8.png"
    },
    {
      day: 9,
      title: "Design Your AI Innovation",
      desc: "Dream up your own AI-powered idea to solve a real problem! Plan, design, and build your innovation project.",
      icon: <Lightbulb size={24} className="icon-orange" />,
      color: "#FF8C00",
      image: "/journey/day9.png"
    },
    {
      day: 10,
      title: "AI Innovation Showcase!",
      desc: "Present your project to the world! Celebrate 10 days of learning, collect your certificate, and shine!",
      icon: <Trophy size={24} className="icon-gradient" />,
      color: "linear-gradient(135deg, #0A47A3, #FF8C00)",
      image: "/journey/day10.png"
    }
  ];

  return (
    <section className="program-section section" id="program">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The 10-Day Journey</h2>
          <p className="section-subtitle">
            From curious beginner to AI innovator—each day is a brand-new adventure!
          </p>
        </div>

        <div className="program-grid">
          {days.map((item, index) => (
            <motion.div 
              key={index}
              className={`program-card-profile ${item.day === 10 ? 'special-card-profile' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -10 }}
            >
              <img src={item.image} alt={item.title} className="program-card-bg" />
              
              <div className="program-card-glass">
                <div className="glass-header">
                  <span className="day-label">DAY {item.day}</span>
                  <div className="glass-icon-box">
                    {item.icon}
                  </div>
                </div>
                <h3 className="program-card-title-profile">{item.title}</h3>
                <p className="program-card-desc-profile">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Program;
