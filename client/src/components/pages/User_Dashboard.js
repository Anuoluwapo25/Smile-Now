import React from 'react'
import "../../App.css"
import Footer from "../Footer";
import "../Footer.css"
import UserDashboard from '../UserDashboard';
import { Link } from 'react-router-dom';
import "../UserDashboard.css";



function User_Dashboard ()  {
    return (
      <>
        <UserDashboard />

        <Link to="/services">
        <button className="book_now_button">
          Book Now
        </button>
        </Link>

        <Footer />
    </>
    
    );
    
}

export default User_Dashboard;
 