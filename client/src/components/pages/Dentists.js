import React from "react";
import { Link } from "react-router-dom";
import "./Dentists.css";

function Dentists() {
    return (
        <div className="dentists">
            <div className="dentists__header">
                <h1>Meet Our Dentists</h1>
                <p>Our team of experienced professionals is here to provide the best care for your dental needs. Click on a dentist's name to book an appointment.</p>
            </div>
            <div className="dentists__container">
                <Link to="/book-appointment" className="circle pointer">
                    <div className="icon">
                        {/* Add icon or image for Walk-In */}
                    
                    </div>
                    <div className="service__meta">
                        <h1 className="service__text">Walk-In</h1>
                    </div>
                </Link>

                <Link to="/book-appointment" className="circle pointer">
                    <div className="icon">
                        {/* Add icon or image for Dr. Becky A */}
                        
                    </div>
                    <div className="service__meta">
                        <h1 className="service__text">Dr. Becky A</h1>
                    </div>
                </Link>

                <Link to="/book-appointment" className="circle pointer">
                    <div className="icon">
                        {/* Add icon or image for Dr. B. Kobby */}
                        
                    </div>
                    <div className="service__meta">
                        <h1 className="service__text">Dr. B. Kobby</h1>
                    </div>
                </Link>

                <Link to="/book-appointment" className="circle pointer">
                    <div className="icon">
                        {/* Add icon or image for Dr. Tems T */}
                        
                    </div>
                    <div className="service__meta">
                        <h1 className="service__text">Dr. Tems T</h1>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Dentists;
