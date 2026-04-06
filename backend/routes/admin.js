import express from 'express';
import Registration from '../models/Registration.js';

const router = express.Router();

function getAdminKey(req) {
  const header = req.headers['x-admin-key'];
  if (header) return header;
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

/**
 * GET /api/admin/enrollments
 * Lists registrations. Defaults to payment success only.
 * Query: ?status=success|pending|failed|all
 * Auth: X-Admin-Key: <ADMIN_API_KEY> or Authorization: Bearer <ADMIN_API_KEY>
 */
router.get('/enrollments', async (req, res) => {
  try {
    const key = getAdminKey(req);
    if (!process.env.ADMIN_API_KEY || key !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const statusParam = (req.query.status || 'success').toLowerCase();
    const filter = statusParam === 'all' ? {} : { status: statusParam };

    const enrollments = await Registration.find(filter)
      .sort({ paidAt: -1, createdAt: -1 })
      .select({
        studentId: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        phone: 1,
        parentName: 1,
        grade: 1,
        slot: 1,
        address: 1,
        order_no: 1,
        invoice_id: 1,
        amount: 1,
        currency: 1,
        status: 1,
        ottuSessionId: 1,
        createdAt: 1,
        paidAt: 1,
      })
      .lean();

    res.json({
      success: true,
      count: enrollments.length,
      filter: statusParam === 'all' ? 'all statuses' : `status=${statusParam}`,
      enrollments,
    });
  } catch (err) {
    console.error('Admin enrollments error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to load enrollments' });
  }
});

export default router;
