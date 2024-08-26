import React from 'react';
import "../App.css"; 
import "./HeroSection.css"; 
import { Link } from 'react-router-dom';


function HeroSection() {
  return (
    <div className='hero-container'> 
        <img src="../public/img-1" alt="Welcome, you can SmileNow!" /> 
        <h1>You can SmileNow!</h1>  
        <p>Take a bold step.</p>  
        <div className='hero-btns'>    
            <Link to='sign-up' className='home-btn'>
                GET STARTED 
            </Link>   
        </div>
    </div>
  )
}

export default HeroSection; 
