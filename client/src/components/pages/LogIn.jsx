import React, { useState, useContext } from 'react';
import "../../App.css"; // Import global styles
import "./LogIn.css"; // Import styles specific to the LogIn component
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [buttonColor, setButtonColor] = useState("#0b0b0b");
    const [buttonIcon, setButtonIcon] = useState(null);
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError("");
        setButtonColor("#0b0b0b");
        setButtonIcon(null);

        if (!email || !password) {
            setError("Both email and password are required.");
            setButtonColor("red");
            setButtonIcon(<FontAwesomeIcon icon={faTimes} />);
            return;
        }

        const payload = { email, password };

        try {
            const response = await fetch(`http://127.0.0.1:8000/login/`, {
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

            localStorage.setItem("token", token);
            setIsLoggedIn(true);
            setButtonColor("green");
            setButtonIcon(<FontAwesomeIcon icon={faCheck} />);
            setTimeout(() => {
                navigate("/user_dashboard");
            }, 1000);
        } catch (error) {
            setError(error.message);
            setButtonColor("red");
            setButtonIcon(<FontAwesomeIcon icon={faTimes} />);
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
                    <FontAwesomeIcon icon={faEnvelope} className='input-icon' />
                    <input
                        type="email"
                        placeholder='  Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <FontAwesomeIcon icon={faLock} className='input-icon' />
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
                <div 
                    className='submit' 
                    onClick={handleSubmit} 
                    style={{ backgroundColor: buttonColor }}
                >
                    {buttonIcon}
                    Log In
                </div>
            </div>
        </div>
    );
}

export default LogIn;
