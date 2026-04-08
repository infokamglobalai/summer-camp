import express from 'express';
import Registration from '../models/Registration.js';
import { sendEnrollmentEmail } from '../utils/email.js';

const router = express.Router();

/**
 * Ottu Payment Webhook Handler
 * Receives payment status updates from pay.eduaitutors.com
 */
router.post('/', async (req, res) => {
  try {
    const { session_id, order_no, status, amount } = req.body;
    
    // Normalize status to lowercase for comparison
    const normalizedStatus = status ? status.toLowerCase() : '';
    
    console.log(`🔔 Webhook received - Session: ${session_id}, Order: ${order_no}, Status: ${status} (Normalized: ${normalizedStatus})`);

    // 1. Find the registration associated with this order/session
    const registration = await Registration.findOne({ 
      $or: [
        { order_no: order_no }, 
        { ottuSessionId: session_id }
      ].filter(q => q.order_no || q.ottuSessionId) // Avoid empty queries
    });

    if (!registration) {
      console.warn(`⚠️ Registration not found for Order: ${order_no} or Session: ${session_id}`);
      console.log('Full Webhook Payload:', JSON.stringify(req.body, null, 2));
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    // 2. Update status if payment is successful
    // Accepting 'success' or 'paid' as indicators of successful payment
    if (normalizedStatus === 'success' || normalizedStatus === 'paid') {
      registration.status = 'success';
      if (!registration.paidAt) {
        registration.paidAt = new Date();
      }
      await registration.save();
      
      console.log(`✅ Payment Successful recorded for ${registration.firstName} ${registration.lastName}`);

      // 3. Trigger Automated Email with Meeting Link
      await sendEnrollmentEmail(
        registration.email, 
        `${registration.firstName} ${registration.lastName}`,
        registration.slot
      );
    } else if (normalizedStatus === 'failed' || normalizedStatus === 'error') {
      registration.status = 'failed';
      await registration.save();
      console.log(`❌ Payment Failed recorded for ${registration.firstName} ${registration.lastName}`);
    } else {
      console.log(`ℹ️ Unhandled status received: ${status}. Registration status remains: ${registration.status}`);
    }

    // Always respond to Ottu with 200 OK to acknowledge receipt
    res.status(200).json({ success: true, message: 'Webhook processed' });

  } catch (error) {
    console.error('❌ Webhook Error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
