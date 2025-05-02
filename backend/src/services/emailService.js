// email service file, this handles the email sending loginc
require('dotenv').config();
const nodemailer = require('nodemailer');
const { verificationCodeTemplate, emailVerifiedTemplate, instructorAcceptedTemplate, emailSubjects, registrationSuccessfulTemplate, passwordChangedTemplate, newsletterActivatedTemplate } = require('../constants/emailTemplates');

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        ciphers: 'SSLv3', 
        rejectUnauthorized: false // Use with caution in production, only for testing
    }
});

// For the template type use the exempt the template but use the template name in snake case e.g verificationCodeTemplate as verification_code
function emailBody(title, templateType, code) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js"></script>
        <title>${title}</title>
    </head>
    
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #000;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td align="center" style="padding: 0;">
                    <table role="presentation"
                        style="width: 600px; border-collapse: collapse; background-color: #ffffff; margin: 0 auto;">
                        <!-- Header with Logo -->
                        <tr>
                            <td align="center" style="padding: 40px 0 30px 0;">
                                <img height="200px" width="200px"
                                    src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20966.87%20282.35'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:%23b81d1d;}.cls-2{fill:%23e33326;}.cls-3{fill:%23ff5043;}%3c/style%3e%3c/defs%3e%3cg%20id='Layer_2'%20data-name='Layer%202'%3e%3cg%20id='Layer_1-2'%20data-name='Layer%201'%3e%3crect%20class='cls-1'%20y='41.95'%20width='45.53'%20height='240.4'%20rx='20'/%3e%3crect%20class='cls-2'%20x='108.04'%20y='6.64'%20width='37.17'%20height='155.51'%20rx='18.58'%20transform='translate(-23.95%20106.4)%20rotate(-42)'/%3e%3crect%20class='cls-3'%20x='154.16'%20y='-9.68'%20width='33.32'%20height='108.56'%20rx='16.66'%20transform='matrix(0.74,%20-0.67,%200.67,%200.74,%2014.03,%20125.75)'/%3e%3crect%20class='cls-1'%20x='64.08'%20y='21.02'%20width='45.53'%20height='225.05'%20rx='20'%20transform='translate(-66.76%2091.32)%20rotate(-41.6)'/%3e%3cpath%20d='M292.68,116.35l44.61,67.5V115.72q0-6.64,2.85-10a9.64,9.64,0,0,1,7.7-3.32,9.94,9.94,0,0,1,7.89,3.32q2.89,3.31,2.89,10V205.8q0,15.07-12.5,15.08a16.48,16.48,0,0,1-5.62-.9,14.32,14.32,0,0,1-4.69-2.85,27.8,27.8,0,0,1-4.06-4.57q-1.87-2.62-3.75-5.35l-43.52-66.72V207.6q0,6.56-3.05,9.92a10.81,10.81,0,0,1-15.7,0q-3-3.4-3-9.88V119.24a25.08,25.08,0,0,1,1.25-8.83,12.55,12.55,0,0,1,4.92-5.74,13.36,13.36,0,0,1,7.42-2.23,12.18,12.18,0,0,1,9.26,3.75,28.4,28.4,0,0,1,3.44,4.45Q290.81,113.39,292.68,116.35Z'/%3e%3cpath%20d='M471.48,122.28H419.21v28.13h48.13q5.31,0,7.93,2.38a8.13,8.13,0,0,1,2.62,6.29,8.4,8.4,0,0,1-2.58,6.37q-2.58,2.46-8,2.46H419.21v32.58h54.07c3.64,0,6.39.84,8.24,2.54a8.7,8.7,0,0,1,2.77,6.75,8.56,8.56,0,0,1-2.77,6.61q-2.77,2.54-8.24,2.53h-63c-5.05,0-8.69-1.11-10.9-3.36S396,209.71,396,204.71v-86.1a19.13,19.13,0,0,1,1.49-8.16,9.15,9.15,0,0,1,4.64-4.61,19.62,19.62,0,0,1,8.09-1.45h61.25c3.7,0,6.44.82,8.24,2.46a9.14,9.14,0,0,1,0,13C477.92,121.46,475.18,122.28,471.48,122.28Z'/%3e%3cpath%20d='M589.1,123.53H563.79v83.21q0,7.19-3.2,10.66a10.75,10.75,0,0,1-8.28,3.48,10.88,10.88,0,0,1-8.4-3.52q-3.24-3.51-3.24-10.62V123.53H515.35c-4,0-6.9-.87-8.82-2.61a8.88,8.88,0,0,1-2.89-6.92,8.78,8.78,0,0,1,3-7q3-2.58,8.71-2.58H589.1c4,0,7,.89,8.95,2.66a9,9,0,0,1,2.93,7,8.78,8.78,0,0,1-3,6.92Q595,123.53,589.1,123.53Z'/%3e%3cpath%20d='M665.4,201.66l-18.36-73v79.06q0,6.57-2.93,9.85a10.76,10.76,0,0,1-15.43,0q-3-3.24-3-9.89V117.13q0-7.5,3.91-10.12t10.55-2.62h7.18q6.49,0,9.42,1.17a7.91,7.91,0,0,1,4.33,4.22,65.13,65.13,0,0,1,3.21,9.93L681,182.44l16.64-62.73a65.37,65.37,0,0,1,3.2-9.93,7.93,7.93,0,0,1,4.34-4.22q2.93-1.17,9.41-1.17h7.19q6.64,0,10.55,2.62t3.9,10.12v90.62q0,6.57-2.93,9.85a10,10,0,0,1-7.85,3.28,9.8,9.8,0,0,1-7.58-3.28q-3-3.28-3-9.85V128.69l-18.35,73q-1.8,7.11-2.93,10.43a14.45,14.45,0,0,1-4.18,6q-3.06,2.75-8.44,2.74a12.34,12.34,0,0,1-11.25-6.25,25.22,25.22,0,0,1-2.46-6.06Q666.34,205.26,665.4,201.66Z'/%3e%3cpath%20d='M773,206.74V116.5q0-7,3.2-10.54a10.68,10.68,0,0,1,8.28-3.52,11.05,11.05,0,0,1,8.48,3.48q3.24,3.47,3.24,10.58v90.24q0,7.11-3.24,10.62a11,11,0,0,1-8.48,3.52,10.67,10.67,0,0,1-8.24-3.56Q772.95,213.77,773,206.74Z'/%3e%3cpath%20d='M902.53,122.28H856.82v29.3H895c3.54,0,6.18.8,7.93,2.38a8.21,8.21,0,0,1,2.61,6.37,8,8,0,0,1-2.65,6.33c-1.77,1.56-4.41,2.34-7.89,2.34H856.82v37.74q0,7.19-3.24,10.66a11.73,11.73,0,0,1-16.72,0q-3.24-3.51-3.24-10.62V118.61a19.3,19.3,0,0,1,1.48-8.16,9.2,9.2,0,0,1,4.65-4.61,19.62,19.62,0,0,1,8.09-1.45h54.69q5.54,0,8.24,2.46a9.16,9.16,0,0,1,0,13Q908.07,122.28,902.53,122.28Z'/%3e%3cpath%20d='M943.67,206.74V116.5q0-7,3.2-10.54a10.65,10.65,0,0,1,8.28-3.52,11.05,11.05,0,0,1,8.48,3.48q3.24,3.47,3.24,10.58v90.24q0,7.11-3.24,10.62a11,11,0,0,1-8.48,3.52,10.67,10.67,0,0,1-8.24-3.56Q943.67,213.77,943.67,206.74Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
                                    alt="Netmifi Logo">
                            </td>
                        </tr>
                        <!-- Main Content -->
                        
                        <tr>
                            <td style="padding: 36px 30px 42px 30px;">
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            ${templateType === 'verification_code' ? verificationCodeTemplate(code)
                                : templateType === 'email_verified' ? emailVerifiedTemplate()
                                    : templateType === 'instructor_accepted' ? instructorAcceptedTemplate()
                                    : templateType === 'password_changed' ? passwordChangedTemplate()
                                    : templateType === ' newsletter_activated' ? newsletterActivatedTemplate()
                                        : registrationSuccessfulTemplate()}
                                </table>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding: 30px; background-color: hsl(0, 100%, 31%); color: #ffffff;">
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 0; width: 50%;" align="left">
                                            <p style="margin: 0; font-size: 14px; line-height: 20px;">&copy; 2023 Your Company<br/><a href="http://www.example.com" style="color: #ffffff; text-decoration: underline;">www.example.com</a></p>
                                        </td>
                                        <td style="padding: 0; width: 50%;" align="right">
                                            <table role="presentation" style="border-collapse: collapse;">
                                                <tr>
                                                    <td style="padding: 0 5px 0 0;">
                                                        <a href="http://www.twitter.com/" style="color: #ffffff;"><img src="https://via.placeholder.com/20" alt="Twitter" style="height: 20px; display: block; border: 0;"></a>
                                                    </td>
                                                    <td style="padding: 0 5px 0 0;">
                                                        <a href="http://www.facebook.com/netmifi" style="color: #ffffff;"><img src="https://via.placeholder.com/20" alt="Facebook" style="height: 20px; display: block; border: 0;"></a>
                                                    </td>
                                                    <td style="padding: 0;">
                                                        <a href="http://www.instagram.com/" style="color: #ffffff;"><img src="https://via.placeholder.com/20" alt="Instagram" style="height: 20px; display: block; border: 0;"></a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
`}

async function sendEmail({ to, subject, templateType }) {
    try {
        // console.log('Sending email to:', to);
        //error on the sending logic. fix it this night
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: subject,
            text: emailBody(subject, templateType, code),
        });
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = {
    sendEmail
};
// Example usage
// sendEmail('demiurgerene@gmail.com', 'Test Subject', 'Hello from Nodemailer!')
//   .then(() => console.log('Email sent successfully'))
//   .catch((error) => console.error('Failed to send email:', error));
