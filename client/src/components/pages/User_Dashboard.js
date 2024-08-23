import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./User_Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
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

  if (loading) return <div className="loading"><i className="fas fa-spinner fa-spin"></i> Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1 className="welcome-header">
        <i className="fas fa-user-circle"></i> Welcome, {profile?.first_name || 'Patient'}!
      </h1>

      <div className="profile-section">
        <h2><i className="fas fa-user"></i> USER PROFILE</h2>
        <p><i className="fas fa-id-badge"></i> Name: {profile?.first_name} {profile?.last_name}</p>
        <p><i className="fas fa-envelope"></i> Email: {profile?.email}</p>
      </div>

      <div className="summary-section">
        <h2><i className="fas fa-calendar-day"></i> DENTAL HEALTH SUMMARY</h2>
        <p><i className="fas fa-calendar-check"></i> Next checkup due: {user?.nextCheckup || 'Not scheduled'}</p>
        <p><i className="fas fa-calendar-times"></i> Last visit: {user?.lastVisit || 'N/A'}</p>
      </div>

      <div className="appointments-section">
        <div className="appointments-header">
          <h2><i className="fas fa-calendar-alt"></i> UPCOMING APPOINTMENTS</h2>
          <button 
            onClick={handleBookAppointment}
            className="book-appointment-button"
          >
            <i className="fas fa-calendar-plus"></i> Book New Appointment
          </button>
        </div>

        {bookings.length === 0 ? (
          <p className="no-appointments"><i className="fas fa-exclamation-circle"></i> You have no upcoming appointments.</p>
        ) : (
          <ul className="appointments-list">
            {bookings.map((booking) => (
              <li key={booking.id} className="appointment-item">
                <div className="appointment-details">
                  <p className="appointment-title"><i className="fas fa-tooth"></i> {booking.treatmentType || 'Dental Appointment'}</p>
                  <p><i className="fas fa-calendar-day"></i> Date: {formatDate(booking.date)}</p>
                  <p><i className="fas fa-clock"></i> Time: {booking.time}</p>
                </div>
                <button className="cancel-button">
                  <i className="fas fa-times"></i> Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="tips-section">
        <h2><i className="fas fa-lightbulb"></i> DENTAL HEALTH TIPS</h2>
        <ul className="tips-list">
          <li><i className="fas fa-check"></i> Brush your teeth twice a day for at least two minutes each time.</li>
          <li><i className="fas fa-check"></i> Floss daily to remove plaque between teeth.</li>
          <li><i className="fas fa-check"></i> Use fluoride toothpaste to prevent cavities.</li>
          <li><i className="fas fa-check"></i> Limit sugary snacks and drinks.</li>
          <li><i className="fas fa-check"></i> Schedule regular dental check-ups every six months.</li>
        </ul>
      </div>
    </div>
  );
}
