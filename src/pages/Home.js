import React from 'react'
import Header from "../components/Common/Header";
import MainComponent from '../LandingPage/MainComponent';
import Carousal from '../components/Carousal';
import Footer from "../components/Common/Footer"
function HomePage() {
  return (
    <div>
         <Header/>
           <MainComponent/>
         <Carousal/>
         <Footer/>
       
        
    </div>
  )
}

export default HomePage;