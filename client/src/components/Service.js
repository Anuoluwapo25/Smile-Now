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
                        Dental cleaning is a preventive procedure to remove plaque, tartar, and stains from your teeth, helping to prevent cavities and gum disease. Regular cleanings can enhance your oral health and leave your mouth feeling fresh.
                    </div>

                    <div className="col__2 text-section">
                        Teeth whitening is a cosmetic procedure that lightens the color of your teeth. Using a bleaching agent, it effectively removes stains and discoloration, giving you a brighter, more confident smile.
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
                        A dental filling is a restorative procedure used to repair cavities or decay in your teeth. The decayed portion is removed, and the tooth is filled with a durable material like composite, amalgam, or gold.
                    </div>

                    <div className="col__2 text-section">
                        Braces are orthodontic devices used to correct misaligned teeth and bite issues. The process involves fitting brackets and wires to gradually move your teeth into the correct position, improving both function and appearance.
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
                        A dental bridge is a fixed prosthetic device used to replace one or more missing teeth. The bridge is anchored to adjacent teeth or implants, effectively restoring both your smile and your ability to chew and speak properly.
                    </div>

                    <div className="col__2 text-section">
                        A root canal is a treatment designed to save a tooth that is badly infected or decayed. During the procedure, the infected pulp is removed, the canal is cleaned and sealed, preventing further infection and saving the tooth from extraction.
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

