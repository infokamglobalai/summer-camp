import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Palette, Zap, BookOpen, UserCheck, Briefcase, GraduationCap, Lightbulb, Trophy, Star } from 'lucide-react';

const Program = () => {
  const days = [
    {
      day: 1,
      title: "Discovering AI",
      desc: "What is AI? How does it change your daily life? Fun experiments and icebreakers to kick off the camp!",
      icon: <Bot size={24} />,
      image: "/journey/day1.png",
      tag: "Foundations"
    },
    {
      day: 2,
      title: "Talking to AI",
      desc: "Have real conversations with AI tools! Understand how chatbots comprehend our language and respond.",
      icon: <MessageSquare size={24} />,
      image: "/journey/day2.png",
      tag: "NLP"
    },
    {
      day: 3,
      title: "AI Art Explosion",
      desc: "Create stunning AI-generated artwork! Learn how AI makes images from words and build your own gallery.",
      icon: <Palette size={24} />,
      image: "/journey/day3.png",
      tag: "Creativity"
    },
    {
      day: 4,
      title: "Prompt Power-Ups",
      desc: "Master the art of prompting! Get AI to write, create, and solve exactly what you want using clever techniques.",
      icon: <Zap size={24} />,
      image: "/journey/day4.png",
      tag: "Skill Mastery"
    },
    {
      day: 5,
      title: "Storytelling with AI",
      desc: "Co-write amazing stories with AI as your creative partner. Explore unique plots, characters, and worlds together!",
      icon: <BookOpen size={24} />,
      image: "/journey/day5.png",
      tag: "Narrative"
    },
    {
      day: 6,
      title: "Story to Comics!",
      desc: "Transform your AI story into a full comic strip! Use AI art tools to bring panels and characters to life.",
      icon: <UserCheck size={24} />,
      image: "/journey/day6.png",
      tag: "Production"
    },
    {
      day: 7,
      title: "AI & Your Future Career",
      desc: "Discover how AI is shaping jobs! Explore exciting careers in tech, healthcare, and art with AI skills.",
      icon: <Briefcase size={24} />,
      image: "/journey/day7.png",
      tag: "Careers"
    },
    {
      day: 8,
      title: "Smart School Projects",
      desc: "Use AI to supercharge your assignments! Research faster, present better, and impress your teachers.",
      icon: <GraduationCap size={24} />,
      image: "/journey/day8.png",
      tag: "Academic"
    },
    {
      day: 9,
      title: "Design Your AI Innovation",
      desc: "Dream up your own AI-powered idea to solve a real problem! Plan, design, and build your innovation project.",
      icon: <Lightbulb size={24} />,
      image: "/journey/day9.png",
      tag: "Innovation"
    },
    {
      day: 10,
      title: "AI Innovation Showcase!",
      desc: "Present your project to the world! Celebrate 10 days of learning, collect your certificate, and shine!",
      icon: <Trophy size={24} />,
      image: "/journey/day10.png",
      tag: "Graduation",
      isMilestone: true
    }
  ];

  return (
    <section className="program-section section mesh-bg" id="program">
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="journey-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Star size={16} className="star-icon" fill="currentColor" />
            <span>LEARNING PATHWAY</span>
          </motion.div>
          <h2 className="section-title">The 10-Day AI <span className="highlight">Adventure</span></h2>
          <p className="section-subtitle mx-auto">
            A carefully crafted curriculum moving from curious beginner to AI innovator.
          </p>
        </motion.div>

        <div className="program-grid">
          {days.map((item, index) => (
            <motion.div 
              key={index}
              className={`journey-card glass ${item.isMilestone ? 'milestone-card' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
              }}
            >
              <div className="card-top">
                <span className="day-number">Day {item.day}</span>
                <span className="card-tag">{item.tag}</span>
              </div>
              
              <div className="card-image-wrapper">
                <img src={item.image} alt={item.title} className="card-img" />
                <div className="card-icon-overlay">
                  {item.icon}
                </div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.desc}</p>
              </div>
              
              {item.isMilestone && (
                <div className="milestone-badge">
                  <Trophy size={14} />
                  <span>GRADUATION DAY</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Program;

