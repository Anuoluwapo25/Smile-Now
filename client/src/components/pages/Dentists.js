import React from "react";
import { Link } from "react-router-dom";
import "./Dentists.css";

function Dentists() {
    return (
        <>
        <div className="dentists">
            <div className="dentists__header">
                <h1>MEET OUR DENTISTS</h1>
                <p>Our team of experienced professionals is here to provide the best care for your dental needs. Click on a dentist's profile to book an appointment.</p>
            </div>
            <div className="dentists__container">
                <div>
                  <Link to="/book-appointment" className="circle pointer first-dentist">
                  </Link>
                  <h3>Dr. Becky</h3>
                </div>
                
                <div>
                <Link to="/book-appointment" className="circle pointer second-dentist">
                </Link>
                <h3>Dr. Tems</h3>
                </div>

                <div>
                <Link to="/book-appointment" className="circle pointer third-dentist">
                </Link>
                <h3>Dr. Kobby</h3>
                </div>

               
            </div>
        </div>
        </>
    );
}

export default Dentists;
