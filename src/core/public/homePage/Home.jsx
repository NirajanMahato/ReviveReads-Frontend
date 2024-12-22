import React from 'react'
import HeroSection from './HeroSection';
import RecommendSection from './RecommendSection';
import Navbar from '../../../components/Navbar';
import BottomNavBar from '../../../components/BottomNavBar';
import Footer from '../../../components/Footer';

const Home = () => {
  return (
    <>
      <div className="min-h-screen mx-auto max-w-[1300px]">
        <Navbar/>
        <HeroSection/>
        <RecommendSection/>
        <BottomNavBar/>
        <Footer/>
      </div>
    </>
  );
}

export default Home