const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../db/database');

// ─── POST /api/contact ────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, email, subject, message.',
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    // Save to contacts table
    db.prepare(`
      INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)
    `).run(name, email, subject, message);

    // Build Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // HTML email body
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Portfolio Contact</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
          .header { background: linear-gradient(135deg, #667eea, #764ba2); padding: 32px 40px; color: #fff; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
          .header p  { margin: 6px 0 0; opacity: 0.85; font-size: 14px; }
          .body { padding: 32px 40px; }
          .field { margin-bottom: 20px; }
          .field label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 4px; }
          .field .value { font-size: 15px; color: #222; background: #f8f9fb; padding: 10px 14px; border-radius: 6px; border-left: 3px solid #667eea; word-break: break-word; }
          .message-box { white-space: pre-wrap; line-height: 1.6; }
          .footer { background: #f8f9fb; padding: 18px 40px; text-align: center; font-size: 12px; color: #aaa; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📬 New Portfolio Contact</h1>
            <p>Someone reached out through your portfolio website</p>
          </div>
          <div class="body">
            <div class="field">
              <label>Name</label>
              <div class="value">${escapeHtml(name)}</div>
            </div>
            <div class="field">
              <label>Email</label>
              <div class="value">${escapeHtml(email)}</div>
            </div>
            <div class="field">
              <label>Subject</label>
              <div class="value">${escapeHtml(subject)}</div>
            </div>
            <div class="field">
              <label>Message</label>
              <div class="value message-box">${escapeHtml(message)}</div>
            </div>
          </div>
          <div class="footer">
            Sent from <strong>haikaldev.my.id</strong> portfolio contact form &bull; ${new Date().toUTCString()}
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: `"HaikalDev Portfolio" <${process.env.SMTP_USER}>`,
      to: 'anaktentara25@gmail.com',
      replyTo: email,
      subject: `[Portfolio Contact] ${subject} - from ${name}`,
      html: htmlBody,
    });

    return res.json({ success: true, message: 'Email sent!' });
  } catch (err) {
    console.error('[contact] Error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
  }
});

/** Simple HTML-escape helper to prevent XSS in email body */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = router;
