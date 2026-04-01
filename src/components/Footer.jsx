import React from 'react';
import { Phone, Mail, MapPin, GraduationCap } from 'lucide-react';

const FacebookIcon = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const InstagramIcon = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const YoutubeIcon = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;
const XIcon = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M12.456 12.456l7.544 -7.544"></path></svg>;
const LinkedinIcon = ({size=20}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-group">
              <img src="/logo-eduaitutors.png" alt="EduAiTutors Logo" className="footer-logo-img" />
            </div>
            <p className="footer-desc">
              Empowering young minds to explore, create, and innovate with artificial intelligence.
            </p>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">CONTACT SUPPORT</h4>
            <ul className="contact-list">
              <li><Phone size={18} color="#FF8C00" /> <span>+91 80507 66363</span></li>
              <li><Mail size={18} color="#FF8C00" /> <span>info@eduaitutors.com</span></li>
              <li><Mail size={18} color="#FF8C00" /> <span>info@kamglobalai.com</span></li>
              <li><Mail size={18} color="#FF8C00" /> <span>info@kiccpa.com</span></li>
              <li className="address-item">
                <MapPin size={18} color="#FF8C00" /> 
                <div className="address-block">
                  <strong>INDIA</strong>
                  <span>RT Nagar, Bengaluru, KA</span>
                </div>
              </li>
              <li className="address-item">
                <MapPin size={18} color="#FF8C00" /> 
                <div className="address-block">
                  <strong>KUWAIT</strong>
                  <span>Block 4, Tunisia St., Hawally</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="links-list">
              <li><a href="#about">About</a></li>
              <li><a href="#highlights">Program</a></li>
              <li><a href="#schedule">Schedule</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4 className="footer-heading">CONNECT WITH US</h4>
            <div className="social-list-vertical">
              <a href="#"><FacebookIcon size={18} /> <span>Facebook</span></a>
              <a href="#"><InstagramIcon size={18} /> <span>Instagram</span></a>
              <a href="#"><XIcon size={18} /> <span>X (Twitter)</span></a>
              <a href="#"><YoutubeIcon size={18} /> <span>YouTube</span></a>
              <a href="#"><LinkedinIcon size={18} /> <span>LinkedIn</span></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2026 AI Adventure Camp. All rights reserved.</p>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;
