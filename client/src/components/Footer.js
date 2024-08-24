import React from 'react'; 
import './Footer.css'; 
import { Link } from 'react-router-dom'; 

function Footer() {
  return (
    <div className='footer-container'> 
      <div className='footer-links'> 
        <div className='footer-link-wrapper'> 
          <div className='footer-link-items'> 
            <h2>ABOUT US</h2>
            <Link to='/'>Investors</Link> 
            <Link to='/'>Terms of Service</Link> 
          </div>
          <div className='footer-link-items'>
            <h2>CONTACT US</h2>
            <Link to='/'>Contact</Link> 
            <Link to='/'>Support</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'> 
          <div className='footer-link-items'> 
            <h2>VIDEOS</h2>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Influencer</Link> 
          </div>
          <div className='footer-link-items'> 
            <h2>@smilenow</h2>
            <Link to='/'>Instagram</Link> 
            <Link to='/'>Facebook</Link> 
            <Link to='/'>Youtube</Link> 
            <Link to='/'>Twitter</Link> 
          </div>
        </div>
      </div>
      <section className='social-media'> 
        <div className='social-media-wrap'>
          <div className='footer-logo'> 
            <Link to='/' className='social-logo'>
              SmileNow
              <i className='fab fa-typo3' /> 
            </Link>
          </div>
          <small className='website-rights'>SmileNow © 2024</small> 
          <div className='social-icons'> 
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' /> 
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' /> 
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' /> 
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' /> 
            </Link>
            <Link
              className='social-icon-link linkedin'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' /> 
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
