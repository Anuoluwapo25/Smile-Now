import React from 'react';
import './Cards.css'; 
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>SmileNow, Take a look around.</h1> 
      <div className='cards__container'> 
        <div className='cards__wrapper'> 
          <ul className='cards__items'> 
            <CardItem         
              src='../../public/images/img-1.jpg'
              text='Home' 
              label='Home.' 
              path='/home'
            />
            
            <CardItem
              src='../../public/images/img-2.jpg' 
              text='Services'
              label='Services.' 
              path='/services' 
            />
          </ul>
          <ul className='cards__items'> 
            <CardItem
              src='../../public/images/img-3.jpg' 
              text='Contact Us'
              label='Contact Us'
              path='/contact-us' 
            />
            <CardItem
              src='../../public/images/img-04.jpg' 
              text='Sign Up' 
              label='Sign Up.'
              path='/sign-up'
            />
            <CardItem
              src='../../public/images/img-08.jpg' 
              text='Log In' 
              label='Log In' 
              path='/log-in' 
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards; 
