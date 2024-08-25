import React from 'react';
import './service.css';
import { Link } from 'react-router-dom';

function Service() {
    return (
        <>
            <div className="service component__space" id="Services">
                <div className="heading">
                    <h1 className="heading">SMILE-NOW | SERVICES</h1>
                </div>

                <div className="row">
                    <div className="col__2">
                        <Link to="/book-appointment" style={{ textDecoration: 'none' }}>
                            <div className="service__box pointer dentist-cleaning">
                                <div className="service__meta">
                                    <h1 className="service__text">GENERAL DENTISTRY</h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col__2 text-section">
                    Comprehensive Care with Our General Dentistry Service
                    Experience top-notch oral health care with our General Dentistry Service, designed to address all aspects of your dental needs. Whether you're looking for routine check-ups, preventive care, or treatment for common dental issues, our general dentistry services have you covered. Our clinic provides a wide range of dental services tailored to maintain and improve your oral health.
                    </div>

                    <div className="col__2 text-section">
                    Brighten Your Smile with Our Professional Dental Whitening Service
                    A radiant smile can light up a room, and our Dental Whitening Service is here to help you achieve just that. Say goodbye to stains and discoloration with our safe, effective, and fast teeth whitening treatments. Whether you have a special occasion coming up or just want to boost your confidence, our professional whitening solutions will give you a brighter, whiter smile. Using a bleaching agent, it effectively removes stains and discoloration, giving you a brighter, more confident smile.
                    </div>
                    <div className="col__2">
                        <Link to="/book-appointment" style={{ textDecoration: 'none' }}>
                            <div className="service__box pointer whiten">
                                <div className="service__meta">
                                    <h1 className="service__text">TEETH WHITENING</h1>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col__2">
                        <Link to="/book-appointment" style={{ textDecoration: 'none' }}>
                            <div className="service__box pointer filling">
                                <div className="service__meta">
                                    <h1 className="service__text">PREVENTIVE DENTISTRY</h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col__2 text-section">
                    Protect Your Smile with Our Preventive Dentistry Service
                    Prevention is the key to a lifetime of healthy smiles. Our Preventive Dentistry Service is designed to help you maintain optimal oral health by preventing dental problems before they start. With regular check-ups and proactive care, you can keep your teeth and gums in excellent condition. Early Detection of Issues: Regular dental check-ups allow us to catch potential problems like cavities, gum disease, and oral cancer early when they are easiest to treat.
                    </div>

                    <div className="col__2 text-section">
                    Achieve Your Perfect Smile with Our Advanced Braces Service
                    Transform your smile with confidence through our Braces Service—the ideal solution for straightening teeth and achieving optimal oral health. Whether you're a teen or an adult, our customized braces are designed to meet your unique needs and lifestyle.Braces are orthodontic devices used to correct misaligned teeth and bite issues. The process involves fitting brackets and wires to gradually move your teeth into the correct position, improving both function and appearance.
                    </div>
                    <div className="col__2">
                        <Link to="/book-appointment" style={{ textDecoration: 'none' }}>
                            <div className="service__box pointer brace">
                                <div className="service__meta">
                                    <h1 className="service__text">BRACE FIX</h1>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col__2">
                        <Link to="/book-appointment" style={{ textDecoration: 'none' }}>
                            <div className="service__box pointer brige">
                                <div className="service__meta">
                                    <h1 className="service__text">DENTURES</h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col__2 text-section">
                    Rediscover Your Smile with Our Premium Dentures Service
                    Are you missing teeth and looking for a reliable, natural-looking solution? Our Dentures Service offers you the perfect way to restore your smile, confidence, and oral functionality. A dental bridge is a fixed prosthetic device used to replace one or more missing teeth. The bridge is anchored to adjacent teeth or implants, effectively restoring both your smile and your ability to chew and speak properly.
                    </div>

                    <div className="col__2 text-section">
                    Experience Comfort and Calm with Our Dental Oral Sedation Service
                    At our clinic, we understand that dental visits can be a source of anxiety for many patients. That’s why we offer Dental Oral Sedation—a safe and effective way to ensure your comfort throughout your dental procedures.
                    Imagine undergoing your dental treatment in a state of deep relaxation, free from stress and fear. With our Dental Oral Sedation service, you can.
                    </div>
                    <div className="col__2">
                        <Link to="/book-appointment" style={{ textDecoration: 'none' }}>
                            <div className="service__box pointer root-canal">
                                <div className="service__meta">
                                    <h1 className="service__text">ORAL SEDATION</h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Service;

