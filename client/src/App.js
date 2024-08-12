import React from "react";
import Navbar from "./components/NavBar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/pages/Home"
import Services from "./components/pages/Services";
import ContactUs from "./components/pages/ContactUs";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path= "/services" Component={Services} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="/contact-us" Component={ContactUs} />
        <Route path="/log-in" Component={LogIn} />

      </Routes>
    </Router>

    </>
      
    
  );
}

export default App;
