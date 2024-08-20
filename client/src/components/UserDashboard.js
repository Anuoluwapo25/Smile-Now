import React, { useEffect, useState } from 'react';
import "./UserDashboard.css";

function UserDashboard() {
  const [userDetails, setUserDetails] = useState({ firstname: '', lastname: '', email: '' });
  const [appointments, setAppointments] = useState([]);
  const [selectedOption, setSelectOption] = useState('')
  const [appointment_date, setAppointment_date] = useState('')
  const [docter, setDocter] = useState('')

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
      "docter":docter,
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

    setDocter(e.target.value)

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
                <p><strong>Docter:</strong> {appointment.docter}</p>
                <p><strong>service:</strong> {appointment.service}</p>
                <p>you have {appointment.service} appointment on {appointment.date} with {appointment.docter}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no upcoming appointments.</p>
        )}
      </div>
    </div>


     <div className='booking-sec'>
         <h3>book you appointment here</h3>

       <form className='book-form' onSubmit={handleSubmit}>
          <label for="service">select a docter</label>
          <select name="service" id="service" value={docter} onChange={handleDocterOption}>
            <option value="none">select docter</option>
            <option value="jenna smith">jenna smith</option>
            <option value="micheal scoot">micheal scott</option>
            <option value="john snow">john snow</option>
          </select>

          <label for="service">select service</label>
          <select name="service" id="service" value={selectedOption} onChange={handleOption}>
            <option value="none">select service</option>
            <option value="dental cleaning">dental cleaning</option>
            <option value="teeth whitening">teeth whitening</option>
            <option value="dental filling">dental filling</option>
            <option value="brace fix">brace fix</option>
            <option value="dental bridge">dental bridge</option>
            <option value="root canal">root canal</option>
          </select>
          <br/>
          <label for="date">select appointment date</label>
          <input type='date' value={appointment_date} onChange={(e)=>setAppointment_date(e.target.value)}></input>

          <button type='submit'>submit</button>
       </form>
     </div>
    </>
  );
}

export default UserDashboard;


