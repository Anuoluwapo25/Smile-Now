import React from "react"
import "../../App.css"
import HeroSection from "../HeroSection"
import Footer from "../Footer"
import Dentist from './Dentists'
import Service from '../Service'
import Hero from "../Hero"

function Home () {
    return (
        <>
        {/* <HeroSection /> */}
        <Hero/>
        {/* <Cards /> */}
        <Service/>
        <Dentist/>
        <Footer />

        </>
    );
}

export default Home;