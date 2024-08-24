import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import './App.css';
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import BookAppointment from "./components/pages/BookAppointment";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import Dentists from "./components/pages/Dentists";
import User_Dashboard from "./components/pages/User_Dashboard";
import Dentist_Login from "./components/pages/Dentist_Login";
import Dentist_Dashboard from "./components/pages/Dentist_Dashboard";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider
import AppointmentsSection from "./components/AppointmentsSection";
import DoctorsAppointment from "./components/DoctorsAppointment";

function App() {
  return (
    <AuthProvider> {/* Wrap the entire app in AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/services" Component={Services} />
          <Route path="/sign-up" Component={SignUp} />
          <Route path="/book-appointment" Component={BookAppointment} />
          <Route path="/log-in" Component={LogIn} />
          <Route path="/dentists" Component={Dentists} />
          <Route path="/user_dashboard" Component={User_Dashboard} />
          <Route path="/dentists/login" Component={Dentist_Login} />
          <Route path="/dentists-dashboard" Component={Dentist_Dashboard} />
          <Route path="/appointmentssection" Component={AppointmentsSection} />
          <Route path="/doctors-appointment" Component={DoctorsAppointment} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
