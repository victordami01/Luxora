import React from 'react';

interface OfferCardProps {
  title: string;
  description: string;
  bgColor: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ title, description, bgColor }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl backdrop-blur-md bg-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className={`absolute inset-0 ${bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      <div className="relative p-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-700 text-lg mb-6">{description}</p>
        <button className="bg-white/80 backdrop-blur-sm text-rose-500 px-6 py-2 rounded-md font-semibold hover:bg-white transition-colors">
          Claim It
        </button>
      </div>
    </div>
  );
};

export default OfferCard;