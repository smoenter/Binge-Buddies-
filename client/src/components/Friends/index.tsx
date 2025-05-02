import React, { useState } from 'react';
import FriendsModal from './FriendsModal'

import './index.css';

const FriendsIcon: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleIconClick = () => {
    console.log("handleIconClick")
    setShowModal(true)
    
  };
  const handleClose = () => {
    console.log("handleClose")
    setShowModal(false)};

    return (
      <div className='friends-icon-container'>
        <button onClick={handleIconClick} className="friends-button">
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/fluency-systems-regular/48/groups--v2.png"
            alt="groups--v2"
          />
        </button>
        {showModal && <FriendsModal onClose={handleClose} userId="currentUserId" />}
      </div>
    );
  };

export default FriendsIcon;