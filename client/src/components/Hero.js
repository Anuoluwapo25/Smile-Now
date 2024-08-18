import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'



const Hero = () => {
  return (
    <div>
        <div className='hero-sec'>
           <h2>Your Oral Health, Our Priority</h2>
           <Link to='sign-up' className='home-btn'>
                GET STARTED 
            </Link>
        </div>
    </div>
  )
}

export default Hero;