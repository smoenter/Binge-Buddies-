import { useState } from 'react';
import InviteForm from './InviteForm';

import './InviteOptions.css';


const InviteOptions = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'sms' | null>(null);

  return (
    <div className="max-w-md mx-auto mt-10 text-center">

      <button onClick={() => setShowOptions(!showOptions)}
        className="button-53" role="button">Invite a Friend!</button>

      {showOptions && !selectedMethod && (
        <div className="mt-4 space-x-4">
          <button
            onClick={() => setSelectedMethod('email')}
            className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500"
          >
            Email
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


