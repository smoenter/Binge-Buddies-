import { useState } from 'react';
import InviteForm from './InviteForm';
import { motion, AnimatePresence } from "framer-motion";
import './InviteOptions.css';


const InviteOptions = () => {
  // const [showOptions, setShowOptions] = useState(false);
  // const [selectedMethod, setSelectedMethod] = useState<'email' | 'sms' | null>(null);

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <button
        onClick={() => setShowForm(!showForm)}
        className="button-53"
        role="button"
      >
        Invite a Friend!
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <InviteForm />
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InviteOptions;


