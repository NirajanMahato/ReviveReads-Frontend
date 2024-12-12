import React from 'react'
import HeroSection from './HeroSection';
import RecommendSection from './RecommendSection';
import Navbar from '../../../components/Navbar';

const Home = () => {
  return (
    <>
      <div className="h-screen">
        <Navbar/>
        <HeroSection/>
        <RecommendSection/>
        {/* <BottomNavBar/>
        <Footer/> */}
      </div>
    </>
  );
}

export default Home