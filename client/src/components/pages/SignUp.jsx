import React, { useState } from 'react';
import "../../App.css"; // Import global styles
import "./SignUp.css"; // Import styles specific to the SignUp component
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError("");
        const payload = {"username":username, "email":email, "password":password, "first_name":firstname, "last_name":lastname };

        try {
            const response = await fetch(`https://smile-now-1.onrender.com/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }

            const data = await response.json();
            console.log("Success:", data);

            navigate('/log-in');
        } catch (error) {
            try {
                const errorObj = JSON.parse(error.message);
                setError(Object.values(errorObj).flat().join(", "));
            } catch {
                setError(error.message);
            }
            console.error("Error:", error);
        }
    };

    return (
        <>
        <div className='container'>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <input
                        type="text"
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
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
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            {error && <div className='error'>{error}</div>}
            <div className='submit-container'>
                <div
                    className='submit'
                    onClick={handleSubmit}
                >
                    Sign Up
                </div>
            </div>
        </div>

        </>
    );
}

export default SignUp;