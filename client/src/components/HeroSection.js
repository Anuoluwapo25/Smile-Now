import React from 'react'; // Import React library for building components
import "../App.css"; // Import global styles
import "./HeroSection.css"; // Import specific styles for the HeroSection component
import { Link } from 'react-router-dom';

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
            <Link to='sign-up' className='home-btn'>
                GET STARTED 
            </Link>
            
            {/* Second button */}
            
        </div>
    </div>
  )
}

export default HeroSection; // Export the HeroSection component for use in other parts of the application
