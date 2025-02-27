import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Your Perfect Style
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Your one-stop destination for beauty services and fashion essentials
          </p>
          <button className="bg-white text-rose-500 px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;