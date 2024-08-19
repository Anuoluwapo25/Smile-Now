import React from 'react'
import "../../App.css"
import Footer from "../Footer";
import "../Footer.css"
import UserDashboard from '../UserDashboard';
import { Link } from 'react-router-dom';



function User_Dashboard ()  {
    return (
      <>
        <UserDashboard />

        <Link to="/services">
        <button style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}>
          Book Now
        </button>
        </Link>

        <Footer />
    </>
    
    );
    
}

export default User_Dashboard;
 