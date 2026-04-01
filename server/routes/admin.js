const express = require('express');
const Registration = require('../models/Registration');
const { authMiddleware } = require('./auth');

const router = express.Router();

// All admin routes require JWT
router.use(authMiddleware);

// ── GET /api/admin/registrations ─────────────────────────────
router.get('/registrations', async (req, res) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { parentName: { $regex: search, $options: 'i' } },
        { childName:  { $regex: search, $options: 'i' } },
        { email:      { $regex: search, $options: 'i' } },
        { phone:      { $regex: search, $options: 'i' } }
      ];
    }

    const [registrations, total] = await Promise.all([
      Registration.find(query)
        .sort({ registeredAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit)),
      Registration.countDocuments(query)
    ]);

    res.json({ registrations, total, page: parseInt(page) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/admin/stats ──────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const [total, paid, pending, failed] = await Promise.all([
      Registration.countDocuments(),
      Registration.countDocuments({ status: 'paid' }),
      Registration.countDocuments({ status: 'pending' }),
      Registration.countDocuments({ status: 'failed' })
    ]);

    const revenueResult = await Registration.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const revenue = revenueResult[0]?.total || 0;

    res.json({ total, paid, pending, failed, revenue });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/admin/export ──────────────────────────────────────
// Export all paid registrations as CSV
router.get('/export', async (req, res) => {
  try {
    const registrations = await Registration.find({ status: 'paid' }).sort({ registeredAt: -1 });

    const csv = [
      ['#', 'Parent Name', 'Email', 'Phone', 'Child Name', 'Grade', 'Slot', 'Amount', 'Payment ID', 'Status', 'Date'].join(','),
      ...registrations.map((r, i) => [
        i + 1,
        `"${r.parentName}"`,
        r.email,
        r.phone,
        `"${r.childName}"`,
        r.grade,
        r.slot === 'am' ? 'Morning' : 'Evening',
        r.amount,
        r.ottuPaymentId || '',
        r.status,
        new Date(r.registeredAt).toLocaleString('en-IN')
      ].join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="registrations.csv"');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Export failed' });
  }
});

module.exports = router;
