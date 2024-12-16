import React from "react";
import loadingGif from "/BG/loading.gif"; // Adjust the path based on your folder structure

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <img src={loadingGif} alt="Loading..." className="w-24 h-24" />
    </div>
  );
};

export default LoadingScreen;
