import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Feedback.css';

const FacebookIcon = ({size=24}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const InstagramIcon = ({size=24}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const YoutubeIcon = ({size=24}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;
const LinkedinIcon = ({size=24}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

const FeedbackSuccess = () => {
  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://www.facebook.com/profile.php?id=61588340534365', color: '#1877F2', name: 'Facebook' },
    { icon: <InstagramIcon />, url: 'https://www.instagram.com/eduaitutors/', color: '#E4405F', name: 'Instagram' },
    { icon: <YoutubeIcon />, url: 'https://www.youtube.com/channel/UC459T_c2E92Lo-7BVJvpzEA', color: '#FF0000', name: 'YouTube' },
    { icon: <LinkedinIcon />, url: 'https://www.linkedin.com/showcase/eduaitutors/about/', color: '#0A66C2', name: 'LinkedIn' },
  ];

  return (
    <>
      <Navbar />
      <div className="feedback-page" style={{ alignItems: 'center' }}>
        <motion.div 
          className="feedback-container"
          style={{ maxWidth: '600px', textAlign: 'center', paddingBottom: '3rem' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
        <div className="feedback-header" style={{ padding: '4rem 2rem' }}>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            style={{ marginBottom: '1.5rem' }}
          >
            <img src="/success-robot.png" alt="Success Robot" style={{ width: '180px', height: 'auto', margin: '0 auto', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }} />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
            style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}
          >
            <CheckCircle size={40} color="#4ade80" />
          </motion.div>
          <h1>Thank You! 🌟</h1>
          <p style={{ fontSize: '1.2rem' }}>Your feedback has been successfully submitted.</p>
        </div>

        <div className="feedback-body" style={{ padding: '2rem' }}>
          <motion.div 
            className="quote-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ marginBottom: '3rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', borderLeft: '4px solid #6366f1' }}
          >
            <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '1.1rem', lineHeight: '1.6' }}>
              "The beautiful thing about learning is that no one can take it away from you."
              <br />
              <span style={{ fontWeight: '700', color: '#1e293b', marginTop: '0.5rem', display: 'block' }}>— B.B. King</span>
            </p>
          </motion.div>

          <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Stay Connected with Us 🌍</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                style={{ color: social.color, background: 'white', padding: '12px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <p style={{ marginTop: '2rem', color: '#64748b', fontSize: '0.9rem' }}>
            Join our community for more updates on AI and technology! 🤖✨
          </p>
        </div>
      </motion.div>
    </div>
    <Footer />
  </>
);
};

export default FeedbackSuccess;
