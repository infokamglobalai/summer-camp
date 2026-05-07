import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  canUseOnWebsite: { type: String, required: true }, // Yes/No
  
  beforeJoining: {
    thoughtAboutAI: { type: String },
    reasonForJoining: { type: String }
  },
  
  duringBootcamp: {
    enjoyedMost: { type: String },
    bestActivity: { type: String },
    classEasy: { type: String }, // Yes/No
    whyEasy: { type: String }
  },
  
  afterBootcamp: {
    learnedThings: { type: String },
    coolCreation: { type: String },
    confidence: { type: String }
  },
  
  funFeedback: {
    favoriteMoment: { type: String },
    oneChange: { type: String }
  },
  
  recommendation: {
    tellFriends: { type: String },
    whoShouldJoin: { type: String }
  },
  
  testimonial: { type: String },
  
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
