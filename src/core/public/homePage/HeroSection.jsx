import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="md:px-8 px-6 pt-8 flex">
        <div className="md:w-2/5 lg:mt-14 md:mt-3 md:ml-4">
          <h1 className="font-[900] lg:text-6xl md:text-4xl text-3xl leading-[1.2] tracking-wide">
            Find Your Next Read Here!
          </h1>
          <div className="flex md:gap-4 gap-2 md:mt-6 mt-3">
            <button className="bg-black text-white md:text-sm text-xs font-semibold lg:w-36 md:w-28 w-28 py-3 rounded-lg border-2 border-black hover:bg-white hover:text-black shadow-md transition-all duration-300">
              Explore Now
            </button>
            <button className="bg-white text-black md:text-sm text-xs font-gilroySemiBold lg:w-36 md:w-28 w-28 py-3 rounded-lg border-2 border-black hover:bg-black hover:text-white shadow-md transition-all duration-300">
              Post Book
            </button>
          </div>
        </div>
        <div className="w-3/5 md:flex lg:px-8 md:px-4 md:gap-6 hidden">
          <div className="">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/41QZuQ2h2WL.jpg"
              alt=""
              className="rounded-t-full w-64 lg:h-80"
            />
          </div>
          <div className="lg:pt-24 pt-12">
            <img
              src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1658767285i/61713106.jpg"
              alt=""
              className="rounded-b-full w-64 lg:h-80 h-44"
            />
          </div>
          <div className="">
            <img
              src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1615737462i/57406422.jpg"
              alt=""
              className="rounded-t-full w-64 lg:h-80 "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
