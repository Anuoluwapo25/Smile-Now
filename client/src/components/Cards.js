import React from 'react';
import './Cards.css'; // Import the CSS file for styling
import CardItem from './CardItem'; // Import the CardItem component

function Cards() {
  return (
    <div className='cards'> {/* Container for the card section */}
      <h1>SmileNow, Take a look around.</h1> {/* Heading for the card section */}
      <div className='cards__container'> {/* Wrapper for the cards container */}
        <div className='cards__wrapper'> {/* Inner wrapper for cards items */}
          <ul className='cards__items'> {/* List for card items */}
            <CardItem         
              src='../../public/images/img-1.jpg' // Source of the image for the card
              text='Home' // Text displayed on the card
              label='Home.' // Label displayed on the card
              path='/home' // Path to navigate to when the card is clicked
            />
            
            <CardItem
              src='../../public/images/img-2.jpg' // Source of the image for the card
              text='Services' // Text displayed on the card
              label='Services.' // Label displayed on the card
              path='/services' // Path to navigate to when the card is clicked
            />
          </ul>
          <ul className='cards__items'> {/* Another list for additional card items */}
            <CardItem
              src='../../public/images/img-3.jpg' // Source of the image for the card
              text='Contact Us' // Text displayed on the card
              label='Contact Us' // Label displayed on the card
              path='/contact-us' // Path to navigate to when the card is clicked
            />
            <CardItem
              src='../../public/images/img-04.jpg' // Source of the image for the card
              text='Sign Up' // Text displayed on the card
              label='Sign Up.' // Label displayed on the card
              path='/sign-up' // Path to navigate to when the card is clicked
            />
            <CardItem
              src='../../public/images/img-08.jpg' // Source of the image for the card
              text='Log In' // Text displayed on the card
              label='Log In' // Label displayed on the card
              path='/log-in' // Path to navigate to when the card is clicked
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards; // Export the Cards component
