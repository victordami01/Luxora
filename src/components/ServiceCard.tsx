import React from 'react';
import { Star } from 'lucide-react';

interface ServiceCardProps {
  image: string;
  title: string;
  rating: number;
  price: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, rating, price }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="text-gray-600">{rating}</span>
        </div>
        <p className="text-rose-500 font-semibold">{price}</p>
        <button className="mt-4 w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;