import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './User_Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faCamera, 
  faEdit, 
  faEnvelope, 
  faCalendarAlt, 
  faCalendarCheck, 
  faCalendarTimes, 
  faTooth, 
  faClock, 
  faCheck, 
  faExclamationCircle, 
  faSignOutAlt, 
  faCalendarPlus, 
  faCalendarDay, 
  faTimes, 
  faLightbulb 
} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempFirstName, setTempFirstName] = useState('');
  const [tempLastName, setTempLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserAndBookings();
    fetchUserProfile(); // Fetch user profile when component mounts
  }, []);

  const fetchUserAndBookings = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/booking/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch user profile');
      const profileData = await response.json();
      setProfile(profileData);
      setTempFirstName(profileData.first_name);
      setTempLastName(profileData.last_name);
      setProfilePicture(profileData.profile_picture);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      setProfile(prev => ({
        ...prev,
        first_name: tempFirstName,
        last_name: tempLastName
      }));
    }
    setIsEditing(!isEditing);
  };

  const handleBookAppointment = () => {
    navigate('/appointmentssection');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="loading"><FontAwesomeIcon icon={faExclamationCircle} spin /> Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1 className="welcome-header">
        <FontAwesomeIcon icon={faUser} /> Welcome, {profile?.first_name || 'Patient'}!
      </h1>

      <div className="profile-section">
        <h2><FontAwesomeIcon icon={faUser} /> USER PROFILE</h2>
        <div className="profile-picture-container">
          <div className="profile-picture">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" />
            ) : (
              <FontAwesomeIcon icon={faUser} size="4x" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            id="profilePictureInput"
            style={{ display: 'none' }}
          />
          <label htmlFor="profilePictureInput" className="camera-icon">
            <FontAwesomeIcon icon={faCamera} size="2x" />
          </label>
        </div>
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
          <>
            <p><FontAwesomeIcon icon={faUser} /> Name: {profile?.first_name} {profile?.last_name}</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> Email: {profile?.email}</p>
          </>
        )}
        <button className="edit-button" onClick={handleEditClick}>
          <FontAwesomeIcon icon={faEdit} />
          {isEditing ? ' Save' : ' Edit'}
        </button>
        <button className="logout-button" onClick={() => console.log('Logout')}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
      </div>

      <div className="summary-section">
        <h2><FontAwesomeIcon icon={faCalendarAlt} /> DENTAL HEALTH SUMMARY</h2>
        <p><FontAwesomeIcon icon={faCalendarCheck} /> Next checkup due: {user?.nextCheckup || 'Not scheduled'}</p>
        <p><FontAwesomeIcon icon={faCalendarTimes} /> Last visit: {user?.lastVisit || 'N/A'}</p>
      </div>

      <div className="appointments-section">
        <div className="appointments-header">
          <h2><FontAwesomeIcon icon={faCalendarAlt} /> UPCOMING APPOINTMENTS</h2>
          <button 
            onClick={handleBookAppointment}
            className="book-appointment-button"
          >
            <FontAwesomeIcon icon={faCalendarPlus} />
            Book New Appointment
          </button>
        </div>

        {bookings.length === 0 ? (
          <p className="no-appointments"><FontAwesomeIcon icon={faExclamationCircle} /> You have no upcoming appointments.</p>
        ) : (
          <ul className="appointments-list">
            {bookings.map((booking) => (
              <li key={booking.id} className="appointment-item">
                <div className="appointment-details">
                  <p className="appointment-title"><FontAwesomeIcon icon={faTooth} /> {booking.treatmentType || 'Dental Appointment'}</p>
                  <p><FontAwesomeIcon icon={faCalendarDay} /> Date: {formatDate(booking.date)}</p>
                  <p><FontAwesomeIcon icon={faClock} /> Time: {booking.time}</p>
                </div>
                <button className="cancel-button">
                  <FontAwesomeIcon icon={faTimes} /> Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="tips-section">
        <h2><FontAwesomeIcon icon={faLightbulb} /> DENTAL HEALTH TIPS</h2>
        <ul className="tips-list">
          <li><FontAwesomeIcon icon={faCheck} /> Brush your teeth twice a day for at least two minutes each time.</li>
          <li><FontAwesomeIcon icon={faCheck} /> Floss daily to remove plaque between teeth.</li>
          <li><FontAwesomeIcon icon={faCheck} /> Use fluoride toothpaste to prevent cavities.</li>
          <li><FontAwesomeIcon icon={faCheck} /> Limit sugary snacks and drinks.</li>
          <li><FontAwesomeIcon icon={faCheck} /> Schedule regular dental check-ups every six months.</li>
        </ul>
      </div>
    </div>
  );
}
