import React from 'react'; // Import React library for building components
import "../App.css"; // Import global styles
import { Button } from './Button'; // Import the Button component
import "./HeroSection.css"; // Import specific styles for the HeroSection component

// Define and export the HeroSection component
function HeroSection() {
  return (
    <div className='hero-container'> {/* Container for the hero section */}
        {/* Image displayed in the hero section */}
        <img src="../public/img-1" alt="Welcome, you can SmileNow!" /> {/* Image with alt text for accessibility */}
        
        {/* Main heading */}
        <h1>You can SmileNow!</h1> {/* Corrected "hi" to "h1" for semantic HTML */}
        
        {/* Subheading or description */}
        <p>Take a bold step.</p> {/* Descriptive text below the heading */}
        
        <div className='hero-btns'> {/* Container for the buttons */}
            {/* First button */}
            <Button 
                className="btns" /* Custom class for styling */
                buttonStyle="btn--outline" /* Style variant for the button (outline style) */
                buttonSize="btn--large" /* Size variant for the button (large size) */
            >
                GET STARTED {/* Button text */}
            </Button>
            
            {/* Second button */}
            <Button 
                className="btns" /* Custom class for styling */
                buttonStyle="btn--primary" /* Style variant for the button (primary style) */
                buttonSize="btn--large" /* Size variant for the button (large size) */
            >
                Watch This <i className='far fa-play-circle' /> {/* Button text with an icon */}
            </Button>
        </div>
    </div>
  )
}

export default HeroSection; // Export the HeroSection component for use in other parts of the application
