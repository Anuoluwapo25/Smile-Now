import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faUser, faEnvelope, faLock, faIdCard } from '@fortawesome/free-solid-svg-icons';
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(null); // null, true (success), false (error)

    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError("");
        setIsSubmitting(true);
        setSuccess(null);

        const payload = { username, email, password, first_name: firstname, last_name: lastname };

        try {
            const response = await fetch(`http://127.0.0.1:8000/register/`, {
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

            setSuccess(true);
            setTimeout(() => {
                navigate('/log-in');
            }, 1000);
        } catch (error) {
            try {
                const errorObj = JSON.parse(error.message);
                setError(Object.values(errorObj).flat().join(", "));
            } catch {
                setError(error.message);
            }
            console.error("Error:", error);
            setSuccess(false);
        } finally {
            setIsSubmitting(false);
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
                    <FontAwesomeIcon icon={faUser} className='input-icon' />
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <FontAwesomeIcon icon={faIdCard} className='input-icon' />
                    <input
                        type="text"
                        placeholder='First Name'
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <FontAwesomeIcon icon={faIdCard} className='input-icon' />
                    <input
                        type="text"
                        placeholder='Last Name'
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <FontAwesomeIcon icon={faEnvelope} className='input-icon' />
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <FontAwesomeIcon icon={faLock} className='input-icon' />
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
                    className={`submit ${success === true ? 'success' : success === false ? 'error' : ''}`}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {success === true ? (
                        <FontAwesomeIcon icon={faCheckCircle} />
                    ) : success === false ? (
                        <FontAwesomeIcon icon={faTimesCircle} />
                    ) : (
                        "Sign Up"
                    )}
                </div>
            </div>
        </div>
    );
}

export default SignUp;
