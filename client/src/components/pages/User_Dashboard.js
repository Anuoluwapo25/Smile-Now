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
      // Simulate fetching user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);

      // Retrieve the token from localStorage (or any other storage you use)
      const token = localStorage.getItem('token');

      // Fetch bookings from the Django backend
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

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1 className="welcome-header">
        Welcome, {profile?.first_name || 'Patient'}!
      </h1>

      <div className="profile-section">
        <h2>USER PROFILE</h2>
        <p>Name: {profile?.first_name} {profile?.last_name}</p>
        <p>Email: {profile?.email}</p>
      </div>

      <div className="summary-section">
        <h2>DENTAL HEALTH SUMMARY</h2>
        <p>Next checkup due: {user?.nextCheckup || 'Not scheduled'}</p>
        <p>Last visit: {user?.lastVisit || 'N/A'}</p>
      </div>

      <div className="appointments-section">
        <div className="appointments-header">
          <h2>UPCOMING APPOINTMENTS</h2>
          <button 
            onClick={handleBookAppointment}
            className="book-appointment-button"
          >
            Book New Appointment
          </button>
        </div>

        {bookings.length === 0 ? (
          <p className="no-appointments">You have no upcoming appointments.</p>
        ) : (
          <ul className="appointments-list">
            {bookings.map((booking) => (
              <li key={booking.id} className="appointment-item">
                <div className="appointment-details">
                  <p className="appointment-title">{booking.treatmentType || 'Dental Appointment'}</p>
                  <p>Date: {formatDate(booking.date)}</p>
                  <p>Time: {booking.time}</p>
                </div>
                <button className="cancel-button">
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="tips-section">
        <h2>DENTAL HEALTH TIPS</h2>
        <ul className="tips-list">
          <li>Brush your teeth twice a day for at least two minutes each time.</li>
          <li>Floss daily to remove plaque between teeth.</li>
          <li>Use fluoride toothpaste to prevent cavities.</li>
          <li>Limit sugary snacks and drinks.</li>
          <li>Schedule regular dental check-ups every six months.</li>
        </ul>
      </div>
    </div>
  );
}
