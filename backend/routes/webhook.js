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
    
    console.log(`🔔 Webhook received for Session: ${session_id}, Status: ${status}`);

    // 1. Find the registration associated with this order/session
    const registration = await Registration.findOne({ 
      $or: [{ order_no: order_no }, { ottuSessionId: session_id }] 
    });

    if (!registration) {
      console.warn(`⚠️ Registration not found for Order: ${order_no}`);
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    // 2. Update status if payment is successful
    if (status === 'success') {
      registration.status = 'success';
      await registration.save();
      
      console.log(`✅ Payment Successful for ${registration.firstName} ${registration.lastName}`);

      // 3. Trigger Automated Email with Meeting Link
      await sendEnrollmentEmail(
        registration.email, 
        `${registration.firstName} ${registration.lastName}`,
        registration.slot
      );
    } else if (status === 'failed') {
      registration.status = 'failed';
      await registration.save();
    }

    // Always respond to Ottu with 200 OK to acknowledge receipt
    res.status(200).json({ success: true, message: 'Webhook processed' });

  } catch (error) {
    console.error('❌ Webhook Error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
