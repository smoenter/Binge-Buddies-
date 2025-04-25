import React, { useState } from 'react';
import FriendsModal from './FriendsModal'



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
    <div>
   <button onClick={handleIconClick} className="gif-hover-button">
        <img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/groups--v2.png" alt="groups--v2"/>
       
      </button>
      {showModal && <FriendsModal onClose={handleClose} />}
    </div>
  );
};

export default FriendsIcon;