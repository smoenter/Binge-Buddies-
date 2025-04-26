import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !fromPhone) {
  throw new Error('Missing Twilio configuration in .env');
}

const client = twilio(accountSid, authToken);

export const sendInviteText = async (toPhone: string, fromUsername: string) => {
  try {
    const message = await client.messages.create({
      body: `${fromUsername} has invited you to join Binge Buddies! 🎬 Sign up now at http://localhost:3000/signup`,
      from: fromPhone,
      to: toPhone, // must be verified for trial accounts
    });

    console.log(`Text sent to ${toPhone}: ${message.sid}`);
  } catch (error) {
    console.error('Error sending text:', error);
    throw error;
  }
};
