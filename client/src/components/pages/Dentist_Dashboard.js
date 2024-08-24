import React from "react";
import "./Dentist_Dashboard.css";
import DentistProfile from "../DentistProfile";
import DoctorsAppointment from "../DoctorsAppointment";

function Dentist_Dashboard () {
    return (
        <>
        <DentistProfile />
        <DoctorsAppointment />
        </>
    )
}

export default Dentist_Dashboard;