import React, { useState } from 'react';
import "../../App.css"; // Import global styles
import "./SignUp.css"; // Import styles specific to the SignUp component
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); 

    const handleSubmit = async () => {
        setError(""); 

        const payload = { email, password, firstname, lastname };

        try {
            const response = await fetch(`http://127.0.0.1:8000/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); // Parse the JSON response
            console.log("Success:", data);

            // Navigate to the login page upon successful sign-up
            navigate('/log-in');
        } catch (error) {
            setError(error.message); // Set the error message to display to the user
            console.error("Error:", error);
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <input
                        type="text"
                        placeholder='First Name'
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <input
                        type="text"
                        placeholder='Last name'
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <input
                        type="email"
                        placeholder='  Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <input
                        type="password"
                        placeholder="  Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            {error && <div className='error'>{error}</div>}
            <div className='submit-container'>
                <div
                    className='submit'
                    onClick={handleSubmit} // Trigger the form submission when clicked
                >
                    Sign Up
                </div>
            </div>
        </div>
    );
}

export default SignUp;
