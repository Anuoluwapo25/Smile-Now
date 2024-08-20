// ProfileSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DentistProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    navigate('/');
  };

  return (
    <div className="profile-section">
      <h2>Welcome, Dr. Jenna Smith!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
};

export default DentistProfile;
