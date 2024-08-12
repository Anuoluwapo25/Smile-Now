import React from 'react'; // Import React library for component creation
import './Footer.css'; // Import CSS styles for the Footer component
import { Button } from './Button'; // Import Button component
import { Link } from 'react-router-dom'; // Import Link for client-side routing

function Footer() {
  return (
    <div className='footer-container'> {/* Main container for the footer */}
      <section className='footer-book_appointment'> {/* Section for booking appointments */}
        <p className='footer-book_appointment-heading'>
          BOOK APPOINTMENT
        </p>
        <p className='footer-book_appointment-text'>
          You can cancel your appointment at any time.
        </p>
        <div className='input-areas'> {/* Container for the input form */}
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Enter your email'
            />
            {/* Button to submit the form */}
            <Button buttonStyle='btn--outline'>BOOK NOW</Button>
          </form>
        </div>
      </section>
      <div className='footer-links'> {/* Container for footer links */}
        <div className='footer-link-wrapper'> {/* Wrapper for grouped footer links */}
          <div className='footer-link-items'> {/* Section for 'About Us' links */}
            <h2>About Us</h2>
            <Link to='/'>Investors</Link> {/* Link to the 'Investors' page */}
            <Link to='/'>Terms of Service</Link> {/* Link to the 'Terms of Service' page */}
          </div>
          <div className='footer-link-items'> {/* Section for 'Contact Us' links */}
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link> {/* Link to the 'Contact' page */}
            <Link to='/'>Support</Link> {/* Link to the 'Support' page */}
          </div>
        </div>
        <div className='footer-link-wrapper'> {/* Wrapper for grouped footer links */}
          <div className='footer-link-items'> {/* Section for 'Videos' links */}
            <h2>Videos</h2>
            <Link to='/'>Ambassadors</Link> {/* Link to the 'Ambassadors' page */}
            <Link to='/'>Influencer</Link> {/* Link to the 'Influencer' page */}
          </div>
          <div className='footer-link-items'> {/* Section for 'Social Media' links */}
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link> {/* Link to the 'Instagram' page */}
            <Link to='/'>Facebook</Link> {/* Link to the 'Facebook' page */}
            <Link to='/'>Youtube</Link> {/* Link to the 'Youtube' page */}
            <Link to='/'>Twitter</Link> {/* Link to the 'Twitter' page */}
          </div>
        </div>
      </div>
      <section className='social-media'> {/* Section for social media links */}
        <div className='social-media-wrap'> {/* Wrapper for social media links */}
          <div className='footer-logo'> {/* Container for the footer logo */}
            <Link to='/' className='social-logo'>
              SmileNow
              <i className='fab fa-typo3' /> {/* Logo icon */}
            </Link>
          </div>
          <small className='website-rights'>SmileNow © 2024</small> {/* Copyright text */}
          <div className='social-icons'> {/* Container for social media icons */}
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' /> {/* Facebook icon */}
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' /> {/* Instagram icon */}
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' /> {/* Youtube icon */}
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' /> {/* Twitter icon */}
            </Link>
            <Link
              className='social-icon-link linkedin'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' /> {/* LinkedIn icon */}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer; // Export the Footer component
