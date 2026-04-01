const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// ── Welcome Email (sent on registration + payment success) ──
const sendWelcomeEmail = async ({ parentName, email, childName, slot, grade, paymentId, amount }) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; background: #f9f9f9; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { background: #008A5E; padding: 40px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 2rem; }
        .header p { margin: 8px 0 0; opacity: 0.9; }
        .body { padding: 40px; }
        .detail-box { background: #f0fdf4; border-left: 4px solid #008A5E; padding: 20px; border-radius: 8px; margin: 24px 0; }
        .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .label { color: #666; font-size: 0.9rem; }
        .value { font-weight: bold; color: #1a1a1a; }
        .notice { background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 16px; margin: 24px 0; font-size: 0.9rem; color: #856404; }
        .footer { text-align: center; padding: 24px 40px; background: #f9f9f9; color: #999; font-size: 0.8rem; }
        .btn { display: inline-block; background: #008A5E; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: bold; margin: 16px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Welcome to AI Adventure Camp!</h1>
          <p>AI Adventure Camp 2026 by EduAiTutors</p>
        </div>
        <div class="body">
          <p>Dear <strong>${parentName}</strong>,</p>
          <p>Congratulations! <strong>${childName}</strong>'s enrollment in the <strong>AI Adventure Bootcamp 2026</strong> is confirmed. We're thrilled to have them join us for 10 days of incredible AI learning!</p>

          <div class="detail-box">
            <table width="100%" cellpadding="6">
              <tr><td class="label">Student</td><td class="value">${childName}</td></tr>
              <tr><td class="label">Grade</td><td class="value">${grade}</td></tr>
              <tr><td class="label">Time Slot</td><td class="value">${slot === 'am' ? 'Morning (10AM - 1PM)' : 'Evening (2PM - 5PM)'}</td></tr>
              <tr><td class="label">Amount Paid</td><td class="value">₹${amount}</td></tr>
              <tr><td class="label">Payment ID</td><td class="value">${paymentId || 'N/A'}</td></tr>
            </table>
          </div>

          <div class="notice">
            📅 <strong>Important:</strong> Your <strong>live class link</strong> will be sent to this email address every day before your session starts. Please keep an eye on your inbox (and spam folder).
          </div>

          <p>If you have any questions, reply to this email or contact us at <a href="mailto:itsupport@eduaitutors.com">itsupport@eduaitutors.com</a></p>

          <p>See you in class! 🎉</p>
          <p><strong>Team EduAiTutors</strong></p>
        </div>
        <div class="footer">
          <p>© 2026 EduAiTutors | AI Adventure Camp</p>
          <p>This is an automated email. Do not reply directly to this address.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: email,
    subject: '🚀 Welcome to AI Adventure Camp 2026 — Enrollment Confirmed!',
    html
  });
};

// ── Receipt Email (payment confirmation) ────────────────────
const sendReceiptEmail = async ({ parentName, email, childName, slot, grade, paymentId, amount, registeredAt }) => {
  const date = new Date(registeredAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { background: #012A5E; padding: 32px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 1.6rem; }
        .receipt-no { font-size: 0.85rem; opacity: 0.8; margin-top: 6px; }
        .body { padding: 40px; }
        .amount-box { text-align: center; padding: 30px; background: #f0fdf4; border-radius: 12px; margin: 24px 0; }
        .amount-box .amt { font-size: 3rem; font-weight: 900; color: #008A5E; }
        .detail-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .detail-table td { padding: 12px 8px; border-bottom: 1px solid #f0f0f0; font-size: 0.9rem; }
        .detail-table td:first-child { color: #666; }
        .detail-table td:last-child { font-weight: bold; text-align: right; }
        .badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
        .footer { text-align: center; padding: 24px; background: #f9f9f9; color: #999; font-size: 0.8rem; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Payment Receipt</h1>
          <div class="receipt-no">AI Adventure Camp 2026</div>
        </div>
        <div class="body">
          <p>Dear <strong>${parentName}</strong>,</p>
          <p>Your payment has been received successfully. Here's your official receipt:</p>

          <div class="amount-box">
            <div class="amt">₹${amount}</div>
            <div><span class="badge">✓ PAID</span></div>
          </div>

          <table class="detail-table">
            <tr><td>Payment ID</td><td>${paymentId}</td></tr>
            <tr><td>Date & Time</td><td>${date}</td></tr>
            <tr><td>Student Name</td><td>${childName}</td></tr>
            <tr><td>Grade</td><td>${grade}</td></tr>
            <tr><td>Time Slot</td><td>${slot === 'am' ? 'Morning (10AM - 1PM)' : 'Evening (2PM - 5PM)'}</td></tr>
            <tr><td>Camp</td><td>AI Adventure Bootcamp 2026</td></tr>
            <tr><td>Amount</td><td>₹${amount}</td></tr>
            <tr><td>Status</td><td><span class="badge">PAID</span></td></tr>
          </table>

          <p style="font-size:0.9rem;color:#666;">Please save this email as proof of payment. For any queries, contact <a href="mailto:itsupport@eduaitutors.com">itsupport@eduaitutors.com</a></p>
        </div>
        <div class="footer">© 2026 EduAiTutors | AI Adventure Camp</div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: email,
    subject: `✅ Payment Confirmed — ₹${amount} | AI Adventure Camp 2026`,
    html
  });
};

module.exports = { sendWelcomeEmail, sendReceiptEmail };
