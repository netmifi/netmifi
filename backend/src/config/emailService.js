require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      text: text,
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error(process.env.SMTP_PASS, 'Error sending email:', error);
    throw error;
  }
}

// Example usage
sendEmail('okenwavictor003@gmail.com', 'Test Subject', 'Hello from Nodemailer!')
  .then(() => console.log('Email sent successfully'))
  .catch((error) => console.error('Failed to send email:', error));
