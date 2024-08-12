import React from "react"; // Import React library
import { Link } from 'react-router-dom'; // Import Link component for routing

// Define possible button styles
const STYLES = ["btn--primary", "btn--outline"];

// Define possible button sizes
const SIZES = ["btn--medium", "btn--large"];

// Define and export the Button component
export const Button = ({
    children, // Content to be displayed inside the button
    type, // Type of the button element (e.g., "button", "submit")
    onClick, // Function to be executed when the button is clicked
    buttonStyle, // Style to be applied to the button
    buttonSize, // Size to be applied to the button
    route // Path to navigate to when the button is clicked
}) => {
        // Check if the provided buttonStyle is valid; default to "btn--primary" if not
        const checkButtonStyle = STYLES.includes(buttonStyle) 
        ? buttonStyle 
        : STYLES[0];

        // Check if the provided buttonSize is valid; default to "btn--medium" if not
        const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
        
        return (
            // Wrap the button in a Link component for routing to the specified route
            <Link to={route} className="btn-mobile">
                <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`} // Combine base class with selected style and size
                onClick={onClick} // Attach the onClick handler
                type={type} // Set the type of the button
                >
                    {children /* Render the button's content */}
                </button>
            </Link>
        );
    }
