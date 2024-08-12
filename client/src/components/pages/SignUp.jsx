import React, { useState } from 'react'; // Import React and the useState hook
import "../../App.css"; // Import general styles
import "./SignUp.css"; // Import specific styles for the login component

const SignUp = () => {
    // action holds the current form state ("Log In" or "Sign Up")
    const [action, setAction] = useState("Sign Up"); // action holds the current form state (either "Log In" or "Sign Up")

    return (
        <div className='container'> {/* Main container for the login form */}
            <div className='header'> {/* Header section containing the title */}
                <div className='text'>{action}</div> {/* Display the current action ("Log In" or "Sign Up") */}
                <div className="underline"></div> {/* Underline decoration under the header text */}
            </div>
            <div className='inputs'> {/* Container for the input fields */}
                {/* Conditionally render the username input field based on the current action */}
                {action === "Sign Up" && (
                    <div className='input'>
                    <input type="text" placeholder='  Username' />
                    </div>
                )}
                <div className='input'>
                    <input type="email" placeholder='  Email' /> {/* Input field for email */}
                </div>
                <div className='input'>
                    <input type="password" placeholder="  Password" /> {/* Input field for password */}
                </div>
            </div>
            {/* Conditionally render the "Forgot Password" link based on the current action */}
            {action === "Sign Up" ? <div></div> : (
                <div className='forgot-password'>
                    Forgot Password? <span>Click here!</span> {/* Clickable "Forgot Password" text */}
                </div>
            )}
            <div className='submit-container'> {/* Container for the submit buttons */}
                {/* Button to switch to Sign Up, grayed out if already in Sign Up mode */}
                <div
                    className={action === "Log In" ? "submit gray" : "submit"} 
                    onClick={() => { setAction("Sign Up") }} /* Set the action to "Sign Up" when clicked */
                >
                    Sign Up
                </div>
                {/* Button to switch to Log In, grayed out if already in Log In mode */}
                <div
                    className={action === "Sign Up" ? "submit gray" : "submit"} 
                    onClick={() => { setAction("Log In") }} /* Set the action to "Log In" when clicked */
                >
                    Log In
                </div>
            </div>
        </div>
    );
}

export default SignUp; // Export the LogIn component
