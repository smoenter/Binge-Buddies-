import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

if (!SENDGRID_API_KEY || !FROM_EMAIL) {
  throw new Error('Missing SendGrid config in .env');
}

sgMail.setApiKey(SENDGRID_API_KEY);

const SIGNUP_URL = 'https://binge-buddies.onrender.com/';

export const sendInviteEmail = async (toEmail: string, fromUsername: string) => {
  const msg = {
    to: toEmail,
    from: FROM_EMAIL,
    subject: `You're Invited to Join Binge Buddies!`,
    text: `${fromUsername} has invited you to join Binge Buddies!\n\nJoin now at: ${SIGNUP_URL}`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f3f4f6; border: 3px solid #3b859d; border-radius: 14px; padding: 30px; color: #1f2937; max-width: 600px; margin: 40px auto; text-align: center;">
        <h2 style="color: #facc15; font-size: 26px; margin-bottom: 16px;">
          You're Invited to Binge Buddies! 📺
        </h2>

        <p style="font-size: 18px; margin: 12px 0;">
          <strong>${fromUsername}</strong> wants to binge-watch & bond with you 🍿🎬
        </p>

        <p style="font-size: 16px; margin: 16px 0;">
          Click the button below to join the fun:
        </p>

        <div style="margin: 28px 0;">
          <a 
            href="${SIGNUP_URL}" 
            style="
              display: inline-block;
              background-color: #3b859d;
              color: white;
              padding: 14px 28px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              font-size: 16px;
            "
          >⭐ Click here to sign up</a>
        </div>

        <p style="font-size: 15px; color: #4b5563; margin-top: 40px;">
          Slide into my Binge Buddies queue so we can get reel! Let’s build our streaming chemistry.
        </p>
      </div>
    `,
  };

  await sgMail.send(msg);
  console.log(`✅ Invite sent to ${toEmail}`);
};





