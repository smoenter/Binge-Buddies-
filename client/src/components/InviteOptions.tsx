import { useState } from 'react';
import InviteForm from './InviteForm';

const InviteOptions = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'sms' | null>(null);

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-bold hover:bg-yellow-300 transition"
        style={{ backgroundColor: '#facc15', color: '#000', borderRadius: '9999px' }}
      >
        Invite a Friend!
      </button>

      {showOptions && !selectedMethod && (
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setSelectedMethod('email')}
            className="px-5 py-2 font-semibold transition"
            style={{ backgroundColor: '#facc15', color: '#000', borderRadius: '9999px' }}
          >
            Email
          </button>
          <button
            onClick={() => setSelectedMethod('sms')}
            className="px-5 py-2 font-semibold opacity-60 cursor-not-allowed transition"
            disabled
            style={{ backgroundColor: '#facc15', color: '#000', borderRadius: '9999px' }}
          >
            Text (coming soon)
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
    </div>
  );
};

export default InviteOptions;


