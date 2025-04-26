import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { INVITE_FRIEND_BY_TEXT } from '../../utils/mutations';
import InputMask from 'react-input-mask-next';

const TextInviteForm = () => {
  const [phone, setPhone] = useState('');
  const [inviteFriendByText, { error, data }] = useMutation(INVITE_FRIEND_BY_TEXT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');

    // Format for Twilio (E.164 format)
    const formattedPhone = `+1${digitsOnly}`;

    try {
      await inviteFriendByText({
        variables: { phoneNumber: formattedPhone },
      });
      setPhone('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputMask
        mask="+1 (999) 999-9999"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      >
        <input
          type="tel"
          placeholder="Friend's phone number"
          required
          className="border rounded w-full px-3 py-2"
        />
      </InputMask>

      <button
        type="submit"
        disabled={!phone || phone.includes('_')}
        className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Send Text
      </button>

      {error && <p className="text-red-500">Error sending text invite.</p>}
      {data && <p className="text-green-500">Text invite sent successfully!</p>}
    </form>
  );
};

export default TextInviteForm;


