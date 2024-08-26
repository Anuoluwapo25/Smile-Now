import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCamera, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './DentistProfile.css';

const DentistProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [isEditing, setIsEditing] = useState(false);
  const [tempFirstName, setTempFirstName] = useState(firstName);
  const [tempLastName, setTempLastName] = useState(lastName);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/dentists/login');
};

<button onClick={handleLogout}>Logout</button>

  const handleEditClick = () => {
    if (isEditing) {
      setFirstName(tempFirstName);
      setLastName(tempLastName);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="dentist-profile">
      <div className="profile-header">
        <div className="profile-picture-container">
          <div className="profile-picture">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" />
            ) : (
              <div className="placeholder">
                <FontAwesomeIcon icon={faUser} size="4x" />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
            id="profilePictureInput"
            style={{ display: 'none' }}
          />
          <label htmlFor="profilePictureInput" className="camera-icon">
            <FontAwesomeIcon icon={faCamera} size="2x" style={{ color: 'blue' }} />
          </label>
        </div>
        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                value={tempFirstName}
                onChange={(e) => setTempFirstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                type="text"
                value={tempLastName}
                onChange={(e) => setTempLastName(e.target.value)}
                placeholder="Last Name"
              />
            </>
          ) : (
            <h2>{firstName} {lastName}</h2>
          )}
          <button className="edit-button" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} />
            {isEditing ? ' Save' : ' Edit'}
          </button>
          <button className="logout-button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt}  />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DentistProfile;
