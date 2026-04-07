import express from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Registration from '../models/Registration.js';

const router = express.Router();

// Generate a professional Enrollment with Ottu Payment Session
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, parentName, email, phone, grade, slot, address, country, state, city } = req.body;
    
    // 1. Determine Pricing and PG Code
    const isIndia = country === 'India' || country === 'IN';
    const amount = isIndia ? "199.00" : "10.00";
    const currency = isIndia ? "INR" : "USD";
    const pg_code = isIndia ? (process.env.OTTU_PG_CODE_INR || "payu") : (process.env.OTTU_PG_CODE_USD || "eduaiusd");

    // 2. Generate unique identifiers for this session
    const invoice_id = uuidv4().replace(/-/g, '').substring(0, 20);
    const order_no = `AI-CAMP-${Date.now()}`;
    const studentId = `STU-${uuidv4().substring(0, 8).toUpperCase()}`;

    // 3. Prepare the Ottu Request Payload
    const ottuPayload = {
      type: "e_commerce",
      amount: amount,
      currency_code: currency,
      order_no: order_no,
      pg_codes: [pg_code],
      language: "en",
      product_type: "AI Adventure Bootcamp 2026",
      customer_first_name: firstName,
      customer_last_name: lastName,
      customer_email: email,
      customer_phone: phone,
      billing_address: {
        city: city || "Hyderabad",
        line1: address || "Educational Services",
        state: state || "Telangana",
        country: isIndia ? "IN" : country,
        postal_code: "500001"
      },
      // Webhook and Redirect URLs
      webhook_url: process.env.WEBHOOK_URL,
      redirect_url: process.env.REDIRECT_URL,
      extra: {
        userId: studentId,
        invoice_id: invoice_id,
        packageName: "AI Adventure Bootcamp"
      }
    };

    // 4. Call the Ottu Payment Gateway
    const ottuResponse = await axios.post(
      process.env.OTTU_API_URL || 'https://pay.eduaitutors.com/b/checkout/v1/pymt-txn/',
      ottuPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Api-Key ${process.env.OTTU_API_KEY}`
        }
      }
    );

    // 5. Save the registration as PENDING in MongoDB
    const registration = new Registration({
      studentId, firstName, lastName, parentName, email, phone, grade, slot, address,
      country, state, city,
      order_no, invoice_id,
      amount: parseFloat(amount),
      currency,
      paymentUrl: ottuResponse.data.checkout_url,
      ottuSessionId: ottuResponse.data.session_id,
      status: 'pending'
    });
    
    await registration.save();

    // 5. Send the payment URL back to the frontend
    res.status(200).json({ 
      success: true, 
      paymentUrl: ottuResponse.data.checkout_url 
    });

  } catch (error) {
    console.error('Enrollment Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create payment session. Please try again later.' 
    });
  }
});

export default router;
