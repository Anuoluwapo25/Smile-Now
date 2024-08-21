// LogIn.js
import React, { useState, useContext } from 'react';
import "../../App.css"; // Import global styles
import "./LogIn.css"; // Import styles specific to the LogIn component
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setIsLoggedIn } = useContext(AuthContext); // Access the setIsLoggedIn function from AuthContext
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError("");
        if (!email || !password) {
            setError("Both email and password are required.");
            return;
        }

        const payload = { email, password };

        try {
            const response = await fetch(`https://smile-now-1.onrender.com/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error("Invalid credentials. Please try again.");
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }

            const data = await response.json();
            const { token } = data;

            // Store the token and update the login state
            localStorage.setItem("token", token);
            setIsLoggedIn(true); // Set login state to true
            navigate("/user_dashboard"); // Redirect to the dashboard
        } catch (error) {
            setError(error.message);
            console.error("Error:", error);
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Log In</div>
                <div className="underline"></div>
            </div>
            <div className='inputs'>
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
            <div className='forgot-password'>
                Are you a dentist? <Link to="/dentists/login">Click here!</Link>
            </div>
            <div className='submit-container'>
                <div className='submit' onClick={handleSubmit}>
                    Log In
                </div>
            </div>
        </div>
    );
}

export default LogIn;
