import React from 'react';
import { Star, Calendar } from 'lucide-react';

interface StylistCardProps {
  image: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
}

const StylistCard: React.FC<StylistCardProps> = ({ image, name, specialty, rating, reviews }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-64">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-rose-500 mb-3">{specialty}</p>
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="text-gray-600">{rating} ({reviews} reviews)</span>
        </div>
        <button className="w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 transition-colors flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5" />
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default StylistCard;