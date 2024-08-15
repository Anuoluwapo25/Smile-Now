import React from 'react';
import { InlineWidget } from "react-calendly";
import './BookAppointment.css';

const BookAppointment = () => {
  return (
    <div className="book-appointment">
      <h1>Book Your Appointment</h1>
      <p>Please select a suitable time for your appointment.</p>
      <div className="calendly-widget">
        <InlineWidget url="https://calendly.com/amablebless/30min" />
      </div>
    </div>
  );
};

export default BookAppointment;
