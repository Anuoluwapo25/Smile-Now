import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Button.css";
import "./NavBar.css";
import { Button } from "./Button";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { isLoggedIn, signupSuccess, logOut } = useContext(AuthContext);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return () => window.removeEventListener("resize", showButton);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            SmileNow <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
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
              <Link to="/dentists" className="nav-links" onClick={closeMobileMenu}>
                Book Now
              </Link>
            </li>
            {!isLoggedIn && !signupSuccess && (
              <li>
                <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </li>
            )}
            <li>
              {isLoggedIn ? (
                <div
                  className="nav-links-mobile"
                  onClick={() => {
                    logOut();
                    closeMobileMenu();
                  }}
                >
                  Logout
                </div>
              ) : (
                <Link to="/log-in" className="nav-links-mobile" onClick={closeMobileMenu}>
                  Log In
                </Link>
              )}
            </li>
          </ul>
          {button && (
            <div className="btn-container">
              {!isLoggedIn && !signupSuccess && (
                <div className="btn-wrapper">
                  <Link to="/sign-up" className="btn-link">
                    <Button
                      route="/sign-up"
                      buttonStyle="btn--outline"
                      buttonSize="btn--large"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
              {isLoggedIn ? (
                <div className="btn-wrapper">
                  <Link to="/">
                    <Button
                      route="/"
                      buttonStyle="btn--outline"
                      buttonSize="btn--medium"
                      onClick={logOut}
                    >
                      Log Out
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="btn-wrapper">
                  <Link to="/log-in" className="btn-link">
                    <Button
                      route="/log-in"
                      buttonStyle="btn--outline"
                      buttonSize="btn--medium"
                    >
                      Log In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
