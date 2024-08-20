import React from "react";
import "./Dentist_Dashboard.css";
import DentistProfile from "../DentistProfile";
import AppointmentsSection from "../AppointmentsSection";

function Dentist_Dashboard () {
    return (
        <>
        <DentistProfile />
        <AppointmentsSection />
        </>
    )
}

export default Dentist_Dashboard;