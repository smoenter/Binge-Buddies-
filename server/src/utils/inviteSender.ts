import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

if (!SENDGRID_API_KEY || !FROM_EMAIL) {
  throw new Error('Missing SendGrid config in .env');
}

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendInviteEmail = async (toEmail: string, fromUsername: string) => {
  const msg = {
    to: toEmail,
    from: FROM_EMAIL,
    subject: `You're invited to join Binge Buddies!`,
    text: `${fromUsername} has invited you to join Binge Buddies!\n\nJoin now at: http://localhost:3000/signup`,
    html: `<p><strong>${fromUsername}</strong> has invited you to join <strong>Binge Buddies</strong>!</p>
           <p><a href="http://localhost:3000/signup">Click here to sign up</a></p>`,
  };

  await sgMail.send(msg);
  console.log(`Invite sent to ${toEmail}`);
};
