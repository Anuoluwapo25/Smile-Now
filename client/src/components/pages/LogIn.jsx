import React, { useState } from 'react';
import "../../App.css"; // Import global styles
import "./LogIn.css"; // Import styles specific to the LogIn component

const LogIn = () => {
    // State to store the input values for email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // State to store any error messages from the API
    const [error, setError] = useState("");

    // Function to handle form submission
    const handleSubmit = async () => {
        // Clear any previous error messages
        setError("");

        // Prepare the data payload for the API request
        const payload = { email, password };

        try {
            const response = await fetch(`http://127.0.0.1:8000/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            // Check if the response is successful (status code in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); // Parse the JSON response
            console.log("Success:", data); // Log the successful response data to the console
            // Here, you can add additional logic to handle the response, such as saving a token or redirecting the user
        } catch (error) {
            setError(error.message); // Set the error message to display to the user
            console.error("Error:", error); // Log the error to the console for debugging
        }
    };

    return (
        <div className='container'> {/* Main container for the login form */}
            <div className='header'> {/* Header section containing the title */}
                <div className='text'>Log In</div> {/* Display the "Log In" action */}
                <div className="underline"></div> {/* Underline decoration under the header text */}
            </div>
            <div className='inputs'> {/* Container for the input fields */}
                <div className='input'>
                    <input
                        type="email"
                        placeholder='  Email' // Placeholder text for the email input
                        value={email} // Bind the input value to the email state
                        onChange={(e) => setEmail(e.target.value)} // Update the email state on input change
                    />
                </div>
                <div className='input'>
                    <input
                        type="password"
                        placeholder="  Password" // Placeholder text for the password input
                        value={password} // Bind the input value to the password state
                        onChange={(e) => setPassword(e.target.value)} // Update the password state on input change
                    />
                </div>
            </div>
            {/* Display an error message if one exists */}
            {error && <div className='error'>{error}</div>}
            {/* Display the "Forgot Password" link */}
            <div className='forgot-password'>
                Forgot Password? <span>Click here!</span> {/* Clickable "Forgot Password" text */}
            </div>
            <div className='submit-container'> {/* Container for the submit button */}
                {/* Button to handle form submission */}
                <div
                    className='submit'
                    onClick={handleSubmit} // Trigger the form submission when clicked
                >
                    Log In {/* Display the "Log In" action */}
                </div>
            </div>
        </div>
    );
}

export default LogIn; // Export the LogIn component as the default export
