import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

if (!SENDGRID_API_KEY || !FROM_EMAIL) {
  throw new Error('Missing SendGrid config in .env');
}

sgMail.setApiKey(SENDGRID_API_KEY);

// Update this to match your deployed frontend URL
const SIGNUP_URL = 'https://binge-buddies.onrender.com/yourwatchlist'; //UPDATE WITH CORRECT URL

export const sendInviteEmail = async (toEmail: string, fromUsername: string) => {
  const msg = {
    to: toEmail,
    from: FROM_EMAIL,
    subject: `You're invited to join Binge Buddies!`,
    text: `${fromUsername} has invited you to join Binge Buddies!\n\nJoin now at: ${SIGNUP_URL}`,
    html: `
      <p><strong>${fromUsername}</strong> has invited you to join <strong>Binge Buddies</strong>!</p>
      <p><a href="${SIGNUP_URL}">Click here to sign up</a></p>
    `,
  };

  await sgMail.send(msg);
  console.log(`✅ Invite sent to ${toEmail}`);
};

