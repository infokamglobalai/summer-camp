import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

/**
 * Send Enrollment Confirmation Email
 * @param {string} toEmail - Student/Parent Email
 * @param {string} studentName - Student's Name
 * @param {string} slot - Morning or Evening Session
 */
export const sendEnrollmentEmail = async (toEmail, studentName, slot) => {
  const meetingLink = "https://zoom.us/j/your-meeting-id"; // Placeholder link
  const sessionTime = slot === 'am' ? "10:00 AM - 1:00 PM" : "2:00 PM - 5:00 PM";

  const mailOptions = {
    from: `"EduAiTutors | AI Adventure Camp" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: `AI Adventure Camp 2026 - Enrollment Successful!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #008A5E; padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Enrollment Confirmed!</h1>
        </div>
        <div style="padding: 40px; color: #333; line-height: 1.6;">
          <p>Dear <strong>${studentName}</strong>,</p>
          <p>Congratulations! Your enrollment in the <strong>AI Adventure Bootcamp 2026</strong> is now successful. We are thrilled to have you join our 10-day intensive journey into the world of Artificial Intelligence.</p>
          
          <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px; margin: 30px 0;">
            <h3 style="margin-top: 0; color: #008A5E;">📅 Class Details</h3>
            <p style="margin: 5px 0;"><strong>Session:</strong> ${slot.toUpperCase()} (${sessionTime})</p>
            <p style="margin: 15px 0; font-size: 1.1rem;">
              <strong>Daily Online Class Meeting Link:</strong><br/>
              <a href="${meetingLink}" style="color: #008A5E; font-weight: bold; text-decoration: underline;">${meetingLink}</a>
            </p>
          </div>

          <p>Please make sure to join the link 5 minutes before your session begins. We recommend using a laptop or computer for the best experience.</p>
          
          <p>If you have any questions, feel free to reply to this email or contact us at it-support@eduaitutors.com.</p>
          
          <p>Let's build the future together!</p>
          <p>Best Regards,<br/><strong>Team EduAiTutors</strong></p>
        </div>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #888; font-size: 12px;">
          © 2026 EduAiTutors | Educational Innovation
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
};
