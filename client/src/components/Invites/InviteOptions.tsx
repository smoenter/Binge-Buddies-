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
            className="invite-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="invite-modal"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <InviteForm />
              <button
                onClick={() => setShowForm(false)}
                className="invite-close"
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


