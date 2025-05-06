import React, { useState, useEffect } from 'react';
import FriendsModal from './FriendsModal';

import './index.css';

const FriendsIcon: React.FC = () => {
  // State to control wheter the modal is visible
  const [showModal, setShowModal] = useState(false);

// State to store a set of friend IDs (for quick add/remove lookups)
  const [friendIds, setFriendIds] = useState<Set<string>>(new Set());

  // Load friend IDs from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const saved = localStorage.getItem('friendIds');
      if (saved) {
        setFriendIds(new Set<string>(JSON.parse(saved)));
      }
    }
  }, []);

  // Save friend IDs to localStorage on change
  useEffect(() => {
    localStorage.setItem('friendIds', JSON.stringify(Array.from(friendIds)));
  }, [friendIds]);


  //Toggle modal visibility on icon click 
  const handleIconClick = () => {
    setShowModal(true);
  };

  // Close modal when called 
  const handleClose = () => {
    setShowModal(false);
  };

  // Placehold for current user ID (could be replaced with Auth or context)
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