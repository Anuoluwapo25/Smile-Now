import React from "react";
import Navbar from "./components/NavBar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/pages/Home"
import Services from "./components/pages/Services";
import BookAppointment from "./components/pages/BookAppointment";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import Dentists from "./components/pages/Dentists";


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path= "/services" Component={Services} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="/book-appointment" Component={BookAppointment} />
        <Route path="/log-in" Component={LogIn} />
        <Route path="/dentists" Component={Dentists} />

      </Routes>
    </Router>

    </>
      
    
  );
}

export default App;
