import React, { useState, useEffect } from "react";
import "./Button.css"; // Importing CSS file for button styling
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import "./NavBar.css"; // Importing CSS file for navbar styling
import { Button } from "./Button"; // Importing Button component

function Navbar() {
    // State to manage the mobile menu's visibility (open/close)
    const [click, setClick] = useState(false);
    // State to determine whether the buttons should be shown or not based on screen size
    const [button, setButton] = useState(true);

    // Function to toggle the mobile menu's visibility
    const handleClick = () => setClick(!click);
    // Function to close the mobile menu
    const closeMobileMenu = () => setClick(false);

    // Function to show/hide buttons based on screen size
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false); // Hide buttons on smaller screens
        } else {
            setButton(true); // Show buttons on larger screens
        }
    };

    // useEffect to ensure buttons are shown/hidden correctly when the component mounts
    useEffect(() => {
        showButton();
    }, []);

    // Event listener to handle window resizing and adjust button visibility accordingly
    window.addEventListener("resize", showButton);

    return (
        <>
            {/* Navbar container */}
            <nav className="navbar">
                <div className="navbar-container">
                    {/* Logo with a clickable link that closes the mobile menu */}
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        SmileNow <i className="fab fa-typo3" />
                    </Link>
                    {/* Menu icon that toggles the mobile menu */}
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"} />
                    </div>
                    {/* Navigation links that change style based on mobile menu state */}
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                                Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact-us" className="nav-links" onClick={closeMobileMenu}>
                                Contact Us
                            </Link>
                        </li>
                        {/* Mobile-only links */}
                        <li>
                            <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
                                Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link to="/log-in" className="nav-links-mobile" onClick={closeMobileMenu}>
                                Log In
                            </Link>
                        </li>
                    </ul>
                    {/* Display buttons only if the screen is large enough */}
                    {button && (
                    <div className="btn-container">
                        <div className="btn-wrapper">
                            <Link to="/sign-up" className="btn-link">
                                <Button route="/sign-up" buttonStyle="btn--outline" buttonSize="btn--large">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                        <div className="btn-wrapper">
                            <Link to="/login" className="btn-link">
                                <Button route="/log-in" buttonStyle="btn--outline" buttonSize="btn--medium">
                                    Log In
                                </Button>
                            </Link>
                        </div>
                    </div>
)}


                </div>
            </nav>
        </>
    );
}

export default Navbar;
