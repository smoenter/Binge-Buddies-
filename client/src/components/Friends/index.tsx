import React, { useState, useEffect } from 'react';
import FriendsModal from './FriendsModal';

import './index.css';

const FriendsIcon: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const [friendIds, setFriendIds] = useState<Set<string>>(new Set());

  // Load friend IDs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('friendIds');
    if (saved) {
      setFriendIds(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save friend IDs to localStorage on change
  useEffect(() => {
    localStorage.setItem('friendIds', JSON.stringify(Array.from(friendIds)));
  }, [friendIds]);

  const handleIconClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const userId = 'currentUserId'; 

  return (
    <div className='friends-icon-container'>
      <button onClick={handleIconClick} className="friends-button">
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/fluency-systems-regular/48/groups--v2.png"
          alt="groups"
        />
      </button>
      {showModal && (
        <FriendsModal
          onClose={handleClose}
          userId={userId}
          friendIds={friendIds}
          setFriendIds={setFriendIds}
        />
      )}
    </div>
  );
};

export default FriendsIcon;