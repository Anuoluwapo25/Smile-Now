import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentSection.css'; // Import the CSS file

export default function AppointmentsSection() {
  const initialFormData = {
    doctor: '', 
    service: '',       
    date: '',
    time: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [asyncValidationError, setAsyncValidationError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.service) errors.service = 'Service is required.';
    if (!formData.doctor) errors.doctor = 'Doctor is required.';
    if (!formData.date) errors.date = 'Date is required.';
    if (!formData.time) errors.time = 'Time is required.';
    return errors;
  };

  // const validateTimeSlot = async () => {
  //   try {
  //     const response = await fetch('http://127.0.0.1:8000/check-availability/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         doctor: formData.doctor,
  //         date: formData.date,
  //         time: formData.time,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to check availability');
  //     }

  //     const data = await response.json();
  //     if (!data.available) {
  //       throw new Error('Selected time slot is not available. Please choose another time.');
  //     }

  //     return null;
  //   } catch (error) {
  //     return error.message;
  //   }
  // };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const errors = validateForm();
    // if (Object.keys(errors).length > 0) {
    //   setFormErrors(errors);
    //   return;
    // }

    setLoading(true);
    setError(null);
    // setAsyncValidationError(null);

    // try {
    //   const asyncError = await validateTimeSlot();
    //   if (asyncError) {
    //     setAsyncValidationError(asyncError);
    //     setLoading(false);
    //     return;
    //   }

    //   const token = localStorage.getItem('token');
    //   if (!token) {
    //     throw new Error('Authentication token not found. Please log in.');
    //   }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/booking/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log(token)
      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      const data = await response.json();
      setFormData(initialFormData);  // Reset the form data after successful submission
      navigate('/booking-confirmation', { state: { booking: data } });
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
  <label htmlFor="service">SERVICE</label>
  <div className="input-icon-wrapper">
    <i className="fa fa-stethoscope input-icon"></i>
    <select
      name="service"
      id="service"
      onChange={handleChange}
      className={`form-select ${formErrors.service ? 'form-select-error' : ''}`}
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
  {formErrors.service && <p className="form-error-message">{formErrors.service}</p>}
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
      {asyncValidationError && <p className="async-error-message">{asyncValidationError}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}