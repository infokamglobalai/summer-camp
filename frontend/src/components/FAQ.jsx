import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="answer-content">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What technical equipment is needed?",
      answer: "A laptop (Windows/Mac/Chromebook) with a stable internet connection and a webcam is all you need. No high-end hardware is required as we use cloud-based AI tools."
    },
    {
      question: "Is the certificate industry recognized?",
      answer: "Yes! The 'AI Explorer' certificate is issued by EduAiTutors and validates your proficiency in practical AI skills, making it a great addition to your digital portfolio or student profile."
    },
    {
      question: "What if I miss a live session?",
      answer: "Don't worry! All live sessions are recorded and made available on our student portal within 2 hours. You'll also have 24/7 access to our AI mentors via Discord."
    },
    {
      question: "Are international payments secure?",
      answer: "We use Ottu and PayU gateways which are PCI-DSS compliant. Whether you're paying in INR or USD, your transaction is protected by bank-grade encryption."
    },
    {
      question: "What is the primary language of instruction?",
      answer: "All sessions are conducted in English. Our mentors are experienced in teaching students from diverse linguistic backgrounds and use simple, clear terminology."
    }
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header text-center">
          <HelpCircle className="section-icon mx-auto" size={40} />
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc mx-auto">Everything you need to know about the AI Summer Camp journey.</p>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
