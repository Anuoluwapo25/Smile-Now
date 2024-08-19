import React from 'react'
import "../../App.css"
import './Services.css';
import Footer from "../Footer";
import "../Footer.css"
import Service from '../Service';
import UserDashboard from '../UserDashboard';



function Serives ()  {
    return (
      <>
        <UserDashboard />
        <Service/>
        <Footer />
    </>
    );
    
}




export default Serives;
 
