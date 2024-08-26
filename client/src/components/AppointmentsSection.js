import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentSection.css'; // Import the CSS file

export default function AppointmentsSection() {
  const initialFormData = {
    doctor: '', 
    services: '',       
    date: '',
    time: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.services) errors.services = 'Services is required.';
    if (!formData.doctor) errors.doctor = 'Doctor is required.';
    if (!formData.date) errors.date = 'Date is required.';
    if (!formData.time) errors.time = 'Time is required.';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle time input separately to ensure proper state update
    if (name === 'time') {
      setFormData(prev => ({
        ...prev,
        time: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    setFormErrors({
      ...formErrors,
      [name]: '',
    });

    if (name === 'doctor' || name === 'date') {
      setFormData(prev => ({ ...prev, time: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please log in.');
      }

      const response = await fetch('http://127.0.0.1:8000/booking/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      const data = await response.json();
      setFormData(initialFormData);
      navigate('/user_dashboard', { state: { booking: data } });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-container">
      <h1 className="appointment-title">Book Appointment</h1>
      <form onSubmit={handleSubmit} className="appointment-form">

        <div className="form-section">
          <label htmlFor="services">SERVICE</label>
          <div className="input-icon-wrapper">
            <i className="fa fa-stethoscope input-icon"></i>
            <select
              name="services"
              id="service"
              onChange={handleChange}
              className={`form-select ${formErrors.services ? 'form-select-error' : ''}`}
              required
              value={formData.service}
            >
              <option value="">Select a Service</option>
              <option value="General Dentistry">General Dentistry</option>
              <option value="Preventive Dentistry">Preventive Dentistry</option>
              <option value="Teeth Whitening">Teeth Whitening</option>
              <option value="Braces">Braces</option>
              <option value="Dentures">Dentures</option>
              <option value="Periodontics">Periodontics</option>
              <option value="Oral Sedation">Oral Sedation</option>
            </select>
          </div>
          {formErrors.services && <p className="form-error-message">{formErrors.services}</p>}
        </div>

        <div className="form-section">
          <label htmlFor="doctor">DENTIST</label>
          <div className="input-icon-wrapper">
            <i className="fa fa-user-md input-icon"></i>
            <select
              name="doctor"
              id="doctor"
              onChange={handleChange}
              className={`form-select ${formErrors.doctor ? 'form-select-error' : ''}`}
              required
              value={formData.doctor}
            >
              <option value="">Select a Dentist</option>
              <option value="Doctor1">Dr. Becky</option>
              <option value="Doctor2">Dr. Tems</option>
              <option value="Doctor3">Dr. Kobby</option>
            </select>
          </div>
          {formErrors.doctor && <p className="form-error-message">{formErrors.doctor}</p>}
        </div>

        <div className="form-section">
          <label htmlFor="date">DATE</label>
          <div className="input-icon-wrapper">
            <i className="fa fa-calendar input-icon"></i>
            <input
              type="date"
              name="date"
              id="date"
              onChange={handleChange}
              className={`form-input ${formErrors.date ? 'form-input-error' : ''}`}
              required
              value={formData.date}
            />
          </div>
          {formErrors.date && <p className="form-error-message">{formErrors.date}</p>}
        </div>

        <div className="form-section">
          <label htmlFor="time">TIME</label>
          <div className="input-icon-wrapper">
            <i className="fa fa-clock input-icon"></i>
            <input
              type="time"
              name="time"
              id="time"
              onChange={handleChange}
              className={`form-input ${formErrors.time ? 'form-input-error' : ''}`}
              required
              value={formData.time}
            />
          </div>
          {formErrors.time && <p className="form-error-message">{formErrors.time}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="form-submit-button"
        >
          {loading ? <i className="fa fa-spinner fa-spin"></i> : 'Book Appointment'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
