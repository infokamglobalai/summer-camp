const express = require('express');
const axios = require('axios');
const Registration = require('../models/Registration');
const { sendWelcomeEmail, sendReceiptEmail } = require('../utils/email');

const router = express.Router();

// ── POST /api/payment/create ─────────────────────────────────
// Creates Ottu checkout session and returns checkout_url
router.post('/create', async (req, res) => {
  try {
    const { parentName, email, phone, childName, grade, slot } = req.body;

    if (!parentName || !email || !phone || !childName || !grade || !slot) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const amount = '199.000';

    // Create pending registration in MongoDB
    const registration = await Registration.create({
      parentName, email, phone, childName, grade, slot,
      amount: 199,
      status: 'pending'
    });

    // Call Ottu API to create checkout session
    const ottuPayload = {
      type: 'payment_request',
      pg_codes: [process.env.OTTU_PG_CODE],
      amount,
      currency_code: 'INR',
      customer_email: email,
      customer_phone: phone,
      customer_first_name: parentName.split(' ')[0],
      customer_last_name: parentName.split(' ').slice(1).join(' ') || '',
      order_no: registration._id.toString(),
      redirect_url: `${process.env.FRONTEND_URL}/payment-success`,
      disclosure_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      extra: {
        registrationId: registration._id.toString(),
        childName,
        grade,
        slot
      }
    };

    const [keyId, keySecret] = process.env.OTTU_API_KEY.split('.');
    const basicAuth = Buffer.from(`${process.env.OTTU_API_KEY}:`).toString('base64');

    const ottuResponse = await axios.post(
      process.env.OTTU_API_URL,
      ottuPayload,
      {
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const { session_id, checkout_url } = ottuResponse.data;

    // Save session_id to registration
    await Registration.findByIdAndUpdate(registration._id, { ottuSessionId: session_id });

    res.json({
      success: true,
      checkout_url,
      session_id,
      registrationId: registration._id
    });

  } catch (err) {
    const ottuError = err.response?.data || err.message;
    const ottuStatus = err.response?.status;
    console.error('❌ Payment create error:');
    console.error('  Status:', ottuStatus);
    console.error('  Response:', JSON.stringify(ottuError, null, 2));
    res.status(500).json({ 
      message: 'Failed to create payment session', 
      detail: ottuError,
      status: ottuStatus
    });
  }
});

// ── POST /api/payment/verify ──────────────────────────────────
// Called from frontend success page to verify payment & finalize
router.post('/verify', async (req, res) => {
  try {
    const { session_id, registrationId } = req.body;

    if (!session_id || !registrationId) {
      return res.status(400).json({ message: 'session_id and registrationId required' });
    }

    const basicAuth = Buffer.from(`${process.env.OTTU_API_KEY}:`).toString('base64');
    const ottuCheck = await axios.get(
      `${process.env.OTTU_API_URL}${session_id}/`,
      {
        headers: { 
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const { state, reference_number } = ottuCheck.data;

    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    if (state === 'paid' || state === 'authorized') {
      if (registration.status !== 'paid') {
        // Update registration as paid
        registration.status = 'paid';
        registration.ottuPaymentId = reference_number || session_id;
        await registration.save();

        // Send emails
        try {
          await sendWelcomeEmail({
            parentName: registration.parentName,
            email: registration.email,
            childName: registration.childName,
            slot: registration.slot,
            grade: registration.grade,
            paymentId: registration.ottuPaymentId,
            amount: registration.amount
          });
          await sendReceiptEmail({
            parentName: registration.parentName,
            email: registration.email,
            childName: registration.childName,
            slot: registration.slot,
            grade: registration.grade,
            paymentId: registration.ottuPaymentId,
            amount: registration.amount,
            registeredAt: registration.registeredAt
          });
        } catch (emailErr) {
          console.error('Email error (non-fatal):', emailErr.message);
        }
      }

      return res.json({
        success: true,
        status: 'paid',
        registration: {
          parentName: registration.parentName,
          email: registration.email,
          childName: registration.childName,
          grade: registration.grade,
          slot: registration.slot,
          amount: registration.amount,
          paymentId: registration.ottuPaymentId,
          registeredAt: registration.registeredAt
        }
      });
    } else {
      await Registration.findByIdAndUpdate(registrationId, { status: 'failed' });
      return res.json({ success: false, status: state });
    }

  } catch (err) {
    console.error('Verify error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Payment verification failed' });
  }
});

// ── POST /api/payment/webhook ──────────────────────────────────
// Ottu server-side webhook (backup confirmation)
router.post('/webhook', async (req, res) => {
  try {
    const { order_no, state, reference_number, session_id } = req.body;
    console.log('Webhook received:', req.body);

    if (state === 'paid' || state === 'authorized') {
      const registration = await Registration.findById(order_no);
      if (registration && registration.status !== 'paid') {
        registration.status = 'paid';
        registration.ottuPaymentId = reference_number || session_id;
        await registration.save();

        try {
          await sendWelcomeEmail({
            parentName: registration.parentName,
            email: registration.email,
            childName: registration.childName,
            slot: registration.slot,
            grade: registration.grade,
            paymentId: registration.ottuPaymentId,
            amount: registration.amount
          });
          await sendReceiptEmail({
            parentName: registration.parentName,
            email: registration.email,
            childName: registration.childName,
            slot: registration.slot,
            grade: registration.grade,
            paymentId: registration.ottuPaymentId,
            amount: registration.amount,
            registeredAt: registration.registeredAt
          });
        } catch (emailErr) {
          console.error('Email error (webhook):', emailErr.message);
        }
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
});

module.exports = router;
