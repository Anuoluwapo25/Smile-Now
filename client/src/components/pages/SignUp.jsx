import React, { useState } from 'react';
import "../../App.css"; // Import global styles
import "./SignUp.css"; // Import styles specific to the SignUp component

const SignUp = () => {
    // State to track the current form action ("Sign Up" or "Log In")
    const [action, setAction] = useState("Sign Up");
    // State to store the input values for username, email, and password
    const [username, setUsername] = useState("");
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
        // Include username in the payload if the action is "Sign Up"
        if (action === "Sign Up") {
            payload.username = username;
        }

        try {
            // Make a POST request to the appropriate API endpoint based on the action
            const response = await fetch(`http://127.0.0.1:800/register/${action.toLowerCase()}`, {
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
        <div className='container'> {/* Main container for the sign-up form */}
            <div className='header'> {/* Header section containing the title */}
                <div className='text'>{action}</div> {/* Display the current action ("Sign Up" or "Log In") */}
                <div className="underline"></div> {/* Underline decoration under the header text */}
            </div>
            <div className='inputs'> {/* Container for the input fields */}
                {/* Conditionally render the username input field if the action is "Sign Up" */}
                {action === "Sign Up" && (
                    <div className='input'>
                        <input
                            type="text"
                            placeholder='  Username' // Placeholder text for the username input
                            value={username} // Bind the input value to the username state
                            onChange={(e) => setUsername(e.target.value)} // Update the username state on input change
                        />
                    </div>
                )}
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
            {/* Conditionally render the "Forgot Password" link if the action is "Log In" */}
            {action === "Sign Up" ? <div></div> : (
                <div className='forgot-password'>
                    Forgot Password? <span>Click here!</span> {/* Clickable "Forgot Password" text */}
                </div>
            )}
            <div className='submit-container'> {/* Container for the submit button and action toggle */}
                {/* Button to handle form submission */}
                <div
                    className='submit'
                    onClick={handleSubmit} // Trigger the form submission when clicked
                >
                    {action} {/* Display the current action ("Sign Up" or "Log In") */}
                </div>
                {/* Button to toggle between Sign Up and Log In modes */}
                <div
                    className='toggle-action'
                    onClick={() => setAction(action === "Sign Up" ? "Log In" : "Sign Up")} // Toggle the action between "Sign Up" and "Log In"
                >
                    {action === "Sign Up" ? "Log In" : "Sign Up"}
                </div>
            </div>
        </div>
    );
}

export default SignUp; // Export the SignUp component as the default export
