// AppointmentsSection.jsx
import React, { useState, useEffect } from 'react';

const AppointmentsSection = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the backend
    fetch('/api/appointments')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setAppointments(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  const handleCheckboxChange = (appointmentId) => {
    // Mark appointment as done and remove from the list
    fetch(`/api/appointments/${appointmentId}/done`, {
      method: 'POST',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => setAppointments(prev => prev.filter(appt => appt.id !== appointmentId)))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  };

  const handleCancelAppointment = (appointmentId) => {
    // Cancel appointment
    fetch(`/api/appointments/${appointmentId}/cancel`, {
      method: 'POST',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => setAppointments(prev => prev.filter(appt => appt.id !== appointmentId)))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  };

  return (
    <div className="appointments-section">
      <h2>Upcoming Appointments</h2>
      {appointments.map(appointment => (
        <div key={appointment.id} className="appointment-card">
          <p>Patient: {appointment.patientName}</p>
          <p>Date: {appointment.date}</p>
          <p>Time: {appointment.time}</p>
          <p>Service: {appointment.service}</p>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(appointment.id)}
          />
          <label>Mark as Done</label>
          <button onClick={() => handleCancelAppointment(appointment.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsSection;
