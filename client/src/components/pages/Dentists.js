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
                <div className="dentist__card">
                    <div className="profile__section">
                        <Link to="/book-appointment" className="circle pointer first-dentist">
                        </Link>
                        <h3>Dr. Becky</h3>
                    </div>
                    <div className="description__section">
                        <p>Dr. Becky is an experienced dentist with over 15 years of expertise in orthodontics and general dental care. She is dedicated to providing personalized treatments for each of her patients.</p>
                    </div>
                </div>
                
                <div className="dentist__card">
                    <div className="profile__section">
                        <Link to="/book-appointment" className="circle pointer second-dentist">
                        </Link>
                        <h3>Dr. Temesgen</h3>
                    </div>
                    <div className="description__section">
                        <p>Specializing in pediatric dentistry, Dr. Tems ensures that children have a comfortable and friendly experience during their visits. He has a gentle approach to handling young patients.</p>
                    </div>
                </div>

                <div className="dentist__card">
                    <div className="profile__section">
                        <Link to="/book-appointment" className="circle pointer third-dentist">
                        </Link>
                        <h3>Dr. Kobby</h3>
                    </div>
                    <div className="description__section">
                        <p>With a focus on cosmetic dentistry, Dr. Kobby helps his patients achieve beautiful, confident smiles. He is well-versed in the latest dental technologies and procedures.</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Dentists;
