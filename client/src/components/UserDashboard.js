import React, { useEffect, useState } from 'react';
import "./UserDashboard.css";

function UserDashboard() {
  const [userDetails, setUserDetails] = useState({ firstname: '', lastname: '', email: '' });
  const [appointments, setAppointments] = useState([]);
  const [selectedOption, setSelectOption] = useState('')
  const [appointment_date, setAppointment_date] = useState('')
  const [doctor, setDoctor] = useState('')

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


  const handleSubmit = (e)=>{
    e.preventDefault()
    let appointment_info = {
      "date":appointment_date,
      "doctor":doctor,
      "service":selectedOption
    }
    setAppointments((prev) => [...prev, appointment_info])
  }

  const handleOption = (e)=>{
    e.preventDefault()
    setSelectOption(e.target.value)
  }


  const handleDocterOption = (e) =>{
    e.preventDefault()

    setDoctor(e.target.value)

  }
  return (

    <>
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
                <p><strong>Doctor:</strong> {appointment.doctor}</p>
                <p><strong>Service:</strong> {appointment.service}</p>
                <p>You have {appointment.service} appointment on {appointment.date} with {appointment.doctor}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no upcoming appointments.</p>
        )}
      </div>
    </div>


     <div className='booking-sec'>
         <h3>Book your appointment here</h3>

       <form className='book-form' onSubmit={handleSubmit}>
          <label for="service">Select you Doctor</label>
          <select name="service" id="service" value={doctor} onChange={handleDocterOption}>
            <option value="none">Select your Doctor</option>
            <option value="Dr. Jenna Smith">Dr. Jenna Smith</option>
            <option value="Dr. Micheal Scoot">Dr. Micheal Scott</option>
            <option value="Dr. John Snow">Dr. John Snow</option>
          </select>

          <label for="service">Select Service</label>
          <select name="service" id="service" value={selectedOption} onChange={handleOption}>
            <option value="none">Select Service</option>
            <option value="Dental Cleaning">Dental Cleaning</option>
            <option value="Teeth Whitening">Teeth Whitening</option>
            <option value="Dental Filling">Dental Filling</option>
            <option value="Brace Fix">Brace Fix</option>
            <option value="Dental Bridge">Dental Bridge</option>
            <option value="Root Canal">Root Canal</option>
          </select>
          <br/>
          <label for="date">Select an appointment date</label>
          <input type='date' value={appointment_date} onChange={(e)=>setAppointment_date(e.target.value)}></input>

          <button type='submit'>Submit</button>
       </form>
     </div>
    </>
  );
}

export default UserDashboard;


