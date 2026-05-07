import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Clock, 
  Rocket, 
  Brain, 
  MessageSquare, 
  Share2, 
  Star, 
  Send,
  ArrowLeft
} from 'lucide-react';
import { getApiBaseUrl } from '../apiBase';
import Navbar from './Navbar';
import Footer from './Footer';
import './Feedback.css';

const FeedbackForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    canUseOnWebsite: 'Yes',
    beforeJoining: {
      thoughtAboutAI: '',
      reasonForJoining: ''
    },
    duringBootcamp: {
      enjoyedMost: '',
      bestActivity: '',
      classEasy: 'Yes',
      whyEasy: ''
    },
    afterBootcamp: {
      learnedThings: '',
      coolCreation: '',
      confidence: ''
    },
    funFeedback: {
      favoriteMoment: '',
      oneChange: ''
    },
    recommendation: {
      tellFriends: '',
      whoShouldJoin: ''
    },
    testimonial: ''
  });

  const handleChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        window.location.href = '/feedback-success';
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="feedback-page">
        <motion.div 
          className="feedback-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="feedback-header">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Share Your Experience
            </motion.h1>
            <p>Your feedback helps us create better learning journeys for future AI innovators! 🚀</p>
          </div>

        <form className="feedback-body" onSubmit={handleSubmit}>
          
          {/* Basic Details */}
          <section className="feedback-section">
            <div className="section-title">
              <div className="section-icon bg-indigo"><User size={20} /></div>
              <h2>Basic Details</h2>
            </div>
            <div className="form-group">
              <label>What's your name? *</label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                required 
                value={formData.name}
                onChange={(e) => handleChange(null, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>What grade are you in? *</label>
              <input 
                type="text" 
                placeholder="e.g. 8th Grade" 
                required 
                value={formData.grade}
                onChange={(e) => handleChange(null, 'grade', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Can we use your feedback on our website?</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="canUseOnWebsite" 
                    value="Yes" 
                    checked={formData.canUseOnWebsite === 'Yes'}
                    onChange={(e) => handleChange(null, 'canUseOnWebsite', e.target.value)}
                  /> Yes
                </label>
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="canUseOnWebsite" 
                    value="No" 
                    checked={formData.canUseOnWebsite === 'No'}
                    onChange={(e) => handleChange(null, 'canUseOnWebsite', e.target.value)}
                  /> No
                </label>
              </div>
            </div>
          </section>

          {/* Before Joining */}
          <section className="feedback-section">
            <div className="section-title">
              <div className="section-icon bg-yellow"><Clock size={20} /></div>
              <h2>🟡 Before Joining</h2>
            </div>
            <div className="form-group">
              <label>Before joining this AI bootcamp, what did you think about AI?</label>
              <textarea 
                className="textarea-autosize" 
                placeholder="Your thoughts..."
                value={formData.beforeJoining.thoughtAboutAI}
                onChange={(e) => handleChange('beforeJoining', 'thoughtAboutAI', e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Why did you decide to join this bootcamp?</label>
              <textarea 
                className="textarea-autosize" 
                placeholder="Tell us your reason..."
                value={formData.beforeJoining.reasonForJoining}
                onChange={(e) => handleChange('beforeJoining', 'reasonForJoining', e.target.value)}
              ></textarea>
            </div>
          </section>

          {/* During the Bootcamp */}
          <section className="feedback-section">
            <div className="section-title">
              <div className="section-icon bg-blue"><Rocket size={20} /></div>
              <h2>🔵 During the Bootcamp</h2>
            </div>
            <div className="form-group">
              <label>What did you enjoy the most in the bootcamp?</label>
              <textarea 
                className="textarea-autosize" 
                placeholder="Most favorite parts..."
                value={formData.duringBootcamp.enjoyedMost}
                onChange={(e) => handleChange('duringBootcamp', 'enjoyedMost', e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Which activity or project did you like the best?</label>
              <input 
                type="text" 
                placeholder="Name of project or activity" 
                value={formData.duringBootcamp.bestActivity}
                onChange={(e) => handleChange('duringBootcamp', 'bestActivity', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Was the class easy to understand?</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="classEasy" 
                    value="Yes" 
                    checked={formData.duringBootcamp.classEasy === 'Yes'}
                    onChange={(e) => handleChange('duringBootcamp', 'classEasy', e.target.value)}
                  /> Yes
                </label>
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="classEasy" 
                    value="No" 
                    checked={formData.duringBootcamp.classEasy === 'No'}
                    onChange={(e) => handleChange('duringBootcamp', 'classEasy', e.target.value)}
                  /> No
                </label>
              </div>
            </div>
            {formData.duringBootcamp.classEasy === 'Yes' && (
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label>👉 What made it easy?</label>
                <input 
                  type="text" 
                  placeholder="e.g. Simple explanations, examples..." 
                  value={formData.duringBootcamp.whyEasy}
                  onChange={(e) => handleChange('duringBootcamp', 'whyEasy', e.target.value)}
                />
              </motion.div>
            )}
          </section>

          {/* After the Bootcamp */}
          <section className="feedback-section">
            <div className="section-title">
              <div className="section-icon bg-purple"><Brain size={20} /></div>
              <h2>🟣 After the Bootcamp</h2>
            </div>
            <div className="form-group">
              <label>What new things did you learn?</label>
              <textarea 
                className="textarea-autosize" 
                placeholder="Skills, concepts, tools..."
                value={formData.afterBootcamp.learnedThings}
                onChange={(e) => handleChange('afterBootcamp', 'learnedThings', e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>What is one cool thing you created using AI?</label>
              <input 
                type="text" 
                placeholder="Your cool project" 
                value={formData.afterBootcamp.coolCreation}
                onChange={(e) => handleChange('afterBootcamp', 'coolCreation', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Do you feel more confident using technology now? How?</label>
              <textarea 
                className="textarea-autosize" 
                placeholder="Share your confidence growth..."
                value={formData.afterBootcamp.confidence}
                onChange={(e) => handleChange('afterBootcamp', 'confidence', e.target.value)}
              ></textarea>
            </div>
          </section>

          {/* Fun + Honest Feedback */}
          <section className="feedback-section">
            <div className="section-title">
              <div className="section-icon bg-red"><MessageSquare size={20} /></div>
              <h2>🔴 Fun + Honest Feedback</h2>
            </div>
            <div className="form-group">
              <label>What was your favorite moment in the class?</label>
              <textarea 
                className="textarea-autosize" 
                placeholder="That one special moment..."
                value={formData.funFeedback.favoriteMoment}
                onChange={(e) => handleChange('funFeedback', 'favoriteMoment', e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>If you could change one thing in this bootcamp, what would it be?</label>
              <textarea 
                className="textarea-autosize" 
                placeholder="Your honest suggestion..."
                value={formData.funFeedback.oneChange}
                onChange={(e) => handleChange('funFeedback', 'oneChange', e.target.value)}
              ></textarea>
            </div>
          </section>

          {/* Recommendation */}
          <section className="feedback-section">
            <div className="section-title">
              <div className="section-icon bg-orange"><Share2 size={20} /></div>
              <h2>🟠 Recommendation</h2>
            </div>
            <div className="form-group">
              <label>Would you tell your friends to join this bootcamp? Why?</label>
              <textarea 
                className="textarea-autosize" 
                placeholder="Yes/No and why..."
                value={formData.recommendation.tellFriends}
                onChange={(e) => handleChange('recommendation', 'tellFriends', e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Who do you think should join this class?</label>
              <input 
                type="text" 
                placeholder="e.g. Beginners, tech lovers, everyone!" 
                value={formData.recommendation.whoShouldJoin}
                onChange={(e) => handleChange('recommendation', 'whoShouldJoin', e.target.value)}
              />
            </div>
          </section>

          {/* Testimonial */}
          <section className="feedback-section">
            <div className="section-title">
              <div className="section-icon bg-gold"><Star size={20} /></div>
              <h2>⭐ Short Testimonial</h2>
            </div>
            <div className="form-group">
              <label>Complete this sentence:</label>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#1e293b' }}>
                👉 <strong>“This AI bootcamp is awesome because ________."</strong>
              </p>
              <textarea 
                className="textarea-autosize" 
                placeholder="Complete the sentence here..."
                required
                value={formData.testimonial}
                onChange={(e) => handleChange(null, 'testimonial', e.target.value)}
              ></textarea>
            </div>
          </section>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : (
              <>
                <Send size={20} /> Submit Feedback
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
    <Footer />
  </>
);
};

export default FeedbackForm;
