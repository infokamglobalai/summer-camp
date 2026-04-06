import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Check } from 'lucide-react';

const Schedule = () => {
  const sessions = [
    {
      title: "Morning Session",
      time: "10:00 AM - 11:30 AM",
      image: "/morning_session.png",
      icon: <Sun size={24} className="icon-morning" />,
      iconBg: "#FEF3C7",
      items: [
        "Hands-on Thinking sessions",
        "Brainstorming Projects",
        "Practical Workshops",
        "Expert Feedback sessions"
      ]
    },
    {
      title: "Evening Session",
      time: "6:00 PM - 7:30 PM",
      image: "/evening_session.png",
      icon: <Moon size={24} className="icon-evening" />,
      iconBg: "#E0E7FF",
      items: [
        "Project Development Time",
        "Advanced AI topics",
        "Peer-to-peer Challenges",
        "Showcase Preparation"
      ]
    }
  ];

  return (
    <section className="schedule-section section" id="schedule">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Daily Schedule</h2>
          <p className="section-subtitle">
            Two intense sessions everyday, focus on learn and action.
          </p>
        </div>

        <div className="schedule-grid">
          {sessions.map((session, index) => (
            <motion.div 
              key={index}
              className="schedule-card"
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="session-image-box">
                <img src={session.image} alt={session.title} className="session-image" />
              </div>
              <div className="session-header">
                <div className="session-icon-box" style={{ backgroundColor: session.iconBg }}>
                  {session.icon}
                </div>
                <div className="session-info">
                  <h3 className="session-title">{session.title}</h3>
                  <p className="session-time">{session.time}</p>
                </div>
              </div>
              <ul className="session-list">
                {session.items.map((item, i) => (
                  <li key={i} className="session-item">
                    <Check size={18} className="check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      
    </section>
  );
};

export default Schedule;
