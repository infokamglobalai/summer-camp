import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

function getAdminKey(req) {
  const header = req.headers['x-admin-key'];
  if (header) return header;
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

/**
 * POST /api/feedback
 * Submit a new student feedback form.
 */
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ 
      success: true, 
      message: 'Thank you for your feedback! It means a lot to us. 🚀' 
    });
  } catch (err) {
    console.error('Feedback submission error:', err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Oops! Something went wrong while submitting your feedback. Please try again.' 
    });
  }
});

/**
 * GET /api/feedback
 * Fetch all feedbacks for the admin dashboard.
 * Auth: Admin API Key required.
 */
router.get('/', async (req, res) => {
  try {
    const key = getAdminKey(req);
    if (!process.env.ADMIN_API_KEY || key !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).lean();
    res.json({ 
      success: true, 
      count: feedbacks.length, 
      feedbacks 
    });
  } catch (err) {
    console.error('Fetch feedback error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch feedbacks' });
  }
});

export default router;
