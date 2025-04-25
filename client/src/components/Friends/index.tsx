import React, { useState } from 'react';
import FriendsModal from './FriendsModal';

const FriendsIcon: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleIconClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <button onClick={handleIconClick}>
        <img src="/icons/friends.svg" alt="Friends" />
      </button>

      {showModal && <FriendsModal onClose={handleClose} />}
    </div>
  );
};

export default FriendsIcon;