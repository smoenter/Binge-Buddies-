import { useState } from 'react';
import InviteForm from './InviteForm';
import TextInviteForm from './InviteTextForm';

const InviteOptions = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'sms' | null>(null);

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-bold hover:bg-yellow-500 transition"
      >
        Invite a Friend!
      </button>

      {showOptions && !selectedMethod && (
        <div className="mt-4 space-x-4">
          <button
            onClick={() => setSelectedMethod('email')}
            className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500"
          >
            Email
          </button>
          <button
            onClick={() => setSelectedMethod('sms')}
            className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500"
          >
            Text
          </button>
        </div>
      )}

      {selectedMethod === 'email' && (
        <div className="mt-6">
          <InviteForm />
          <button
            onClick={() => {
              setSelectedMethod(null);
              setShowOptions(false);
            }}
            className="mt-4 text-sm text-gray-500 underline"
          >
            Cancel
          </button>
        </div>
      )}

      {selectedMethod === 'sms' && (
        <div className="mt-6">
          <TextInviteForm />
          <button
            onClick={() => {
              setSelectedMethod(null);
              setShowOptions(false);
            }}
            className="mt-4 text-sm text-gray-500 underline"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default InviteOptions;


