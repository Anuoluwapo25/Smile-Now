import React, { useState, useEffect } from 'react';
import './DoctorsAppointment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faCheck, faTimes, faSync, faUser, faCalendar, faClock, faStethoscope } from '@fortawesome/free-solid-svg-icons';

export default function DoctorsAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirm, setShowConfirm] = useState({ action: null, appointmentId: null });

  useEffect(() => {
    // Dummy data for testing
    const dummyAppointments = [
      {
        id: 1,
        patient_name: 'Jan Doe',
        time: new Date().setHours(new Date().getHours() + 1), // 1 hour from now
        service: 'Dental Cleaning',
      },
      {
        id: 2,
        patient_name: 'Jane Smith',
        time: new Date().setHours(new Date().getHours() + 2), // 2 hours from now
        service: 'Tooth Extraction',
      },
      {
        id: 3,
        patient_name: 'Alice Johnson',
        time: new Date().setHours(new Date().getHours() + 3), // 3 hours from now
        service: 'Root Canal Treatment',
      },
    ];

    setAppointments(dummyAppointments.sort((a, b) => new Date(a.time) - new Date(b.time)));
    setLoading(false);
  }, []);

  const handleAction = async (appointmentId, action, updatedData = {}) => {
    setShowConfirm({ action, appointmentId });
  };

  const confirmAction = async () => {
    const { action, appointmentId } = showConfirm;
    try {
      setLoading(true);
      // Simulate a backend call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );

      // Show the appropriate notification
      if (action === 'done') {
        alert('Appointment done.');
      } else if (action === 'reschedule') {
        alert('Appointment changed.');
      } else if (action === 'cancel') {
        alert('Appointment canceled.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setShowConfirm({ action: null, appointmentId: null });
      setLoading(false);
    }
  };

  const cancelAction = () => {
    setShowConfirm({ action: null, appointmentId: null });
  };

  const renderAppointmentActions = (appointment) => (
    <div className="appointment-actions">
      <FontAwesomeIcon
        icon={faEllipsisV}
        style={{ color: '#0056b3' }}
        onClick={() => setSelectedAppointment(selectedAppointment === appointment.id ? null : appointment.id)}
      />
      {selectedAppointment === appointment.id && (
        <div className="appointment-menu">
          <button onClick={() => handleAction(appointment.id, 'reschedule')}>
            <FontAwesomeIcon icon={faSync} style={{ color: '#0056b3' }} /> Reschedule
          </button>
          <button onClick={() => handleAction(appointment.id, 'cancel')}>
            <FontAwesomeIcon icon={faTimes} style={{ color: '#0056b3' }} /> Cancel
          </button>
          <button onClick={() => handleAction(appointment.id, 'done')}>
            <FontAwesomeIcon icon={faCheck} style={{ color: '#0056b3' }} /> Done
          </button>
        </div>
      )}
    </div>
  );

  const renderConfirmDialog = () => (
    <div className="confirm-dialog">
      <p>Are you sure you want to {showConfirm.action} this appointment?</p>
      <div className="confirm-buttons">
        <button className="confirm-button" onClick={confirmAction}>
          Confirm
        </button>
        <button className="decline-button" onClick={cancelAction}>
          Decline
        </button>
      </div>
    </div>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="doctors-appointment-container">
      <h1>Upcoming Appointments</h1>
      {showConfirm.action && renderConfirmDialog()}
      <ul className="appointments-list">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointment-item">
            <div className="appointment-info">
              <p><FontAwesomeIcon icon={faUser} style={{ color: '#0056b3' }}/> {appointment.patient_name}</p>
              <p className="green-text"><FontAwesomeIcon icon={faCalendar} style={{ color: '#0056b3' }} /> {new Date(appointment.time).toLocaleDateString()}</p>
              <p className="green-text"><FontAwesomeIcon icon={faClock} style={{ color: '#0056b3' }} /> {new Date(appointment.time).toLocaleTimeString()}</p>
              <p className="green-text"><FontAwesomeIcon icon={faStethoscope} style={{ color: '#0056b3' }} /> {appointment.service}</p>
            </div>
            {renderAppointmentActions(appointment)}
          </li>
        ))}
      </ul>
    </div>
  );
}
