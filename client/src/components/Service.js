import React from 'react'
import './service.css';
import { Link } from 'react-router-dom';

function Service ()  {
    return (
      <>
        <div className="service component__space" id="Services">
            <div className="heading">

                <h1 className="heading">SERVICES</h1>
                <p className="heading p__color">
                
                </p>
                <p className="heading p__color">
                </p>
            </div>

            <div className="row">

       <Link to="/book-appointment" style={{ textDecoration: 'none' }} className='col__3'>
       <div className=" service__box pointer dentist-cleaning">
                            <div className="service__meta">
                                <h1 className="service__text" id="service">DENTAL CLEANING</h1>
                                <p className="p service__text p__color">
                                
                                </p>
                                <p className="p service__text p__color">
                                
                                </p>
                                <p className="p service__text p__color">
                                
                                </p>
                            </div>
                         </div>
        </Link>
         
        <Link to="/book-appointment" style={{ textDecoration: 'none' }} className='col__3'>
          <div className=" service__box pointer whiten">
                            <div className="service__meta">
                                <h1 className="service__text" id="service">TEETH WHITENING</h1>
                                <p className="p service__text p__color">
                                
                                </p>
                                <p className="p service__text p__color">
                                
                                </p>
                                <p className="p service__text p__color">
                                
                                </p>
                            </div>
                         </div>
            </Link>

            <Link to="/book-appointment" style={{ textDecoration: 'none' }} className='col__3'>
          <div className=" service__box pointer filling">
                            <div className="service__meta">
                                <h1 className="service__text" id="service">DENTAL FILLING</h1>
                                <p className="p service__text p__color">
                                
                                </p>
                                <p className="p service__text p__color">
                                
                                </p>
                                <p className="p service__text p__color">
                                
                                </p>
                            </div>
                         </div>
                </Link>
        
          <Link to="/book-appointment" style={{ textDecoration: 'none' }} className='col__3'>
          <div className=" service__box pointer brace">
                            <div className="service__meta">
                                <h1 className="service__text" id="service">BRACE FIX</h1>
                                <p className="p service__text p__color">
                                
                                </p>
                                <p className="p service__text p__color">
                                
                                </p>
                                <p className="p service__text p__color">
                                
                                </p>
                            </div>
                         </div>
            </Link>

        <Link to="/book-appointment" style={{ textDecoration: 'none' }} className='col__3'>
          <div className="service__box pointer brige">
                            <div className="service__meta">
                                <h1 className="service__text" id="service">DENTAL BRIDGE</h1>
                                <p className="p service__text p__color">
                                
                                </p>
                                <p className="p service__text p__color">
                                
                                </p>
                                <p className="p service__text p__color">
                                
                                </p>
                            </div>
                         </div>
            </Link>

        <Link to="/book-appointment" style={{ textDecoration: 'none'}} className='col__3'>
          <div className=" service__box pointer root-canal">
                            <div className="service__meta">
                                <h1 className="service__text" id="service">ROOT CANAL</h1>
                                <p className="p service__text p__color">
                                
                                </p>
                                <p className="p service__text p__color">
                                
                                </p>
                                <p className="p service__text p__color">
                                
                                </p>
                            </div>
                         </div>

                         </Link>
            </div>
       
            </div>
    </>
    );
    
}




export default Service;
 
