import React, { useEffect, useState } from 'react';
import "./UserDashboard.css";

function UserDashboard() {
  const [userDetails, setUserDetails] = useState({ firstname: '', lastname: '', email: '' });
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch user details from the server
    fetch('/api/user/details')
      .then((response) => response.json())
      .then((data) => setUserDetails(data))
      .catch((error) => console.error('Error fetching user details:', error));

    // Fetch appointments from the server
    fetch('/api/user/appointments')
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error('Error fetching appointments:', error));
  }, []);

  return (
    <div className="dashboard">
      <h1>DASHBOARD</h1>
      <div className="user-details">
        <p><strong>First Name:</strong> {userDetails.firstname}</p>
        <p><strong>Last Name:</strong> {userDetails.lastname}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
      </div>
      <div className="appointments-section">
        <h2>Your Appointments</h2>
        {appointments.length > 0 ? (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Dentist:</strong> {appointment.doctor}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no upcoming appointments.</p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
