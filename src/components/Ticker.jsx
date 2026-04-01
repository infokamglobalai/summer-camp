import React from 'react';

const Ticker = () => {
  const items = [
    "🚀 10 DAYS OF ADVENTURE",
    "🤖 MASTER AI TOOLS",
    "🎨 CREATE AI ART",
    "💬 BUILD CHATBOTS",
    "🏆 GET CERTIFIED",
    "📅 STARTING SUMMER 2026",
    "🎒 GRADES 6-12 WELCOME"
  ];

  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {items.map((item, i) => (
          <span key={i} className="t-item">{item}</span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, i) => (
          <span key={`clone-${i}`} className="t-item">{item}</span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
