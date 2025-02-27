import React, { useState } from 'react';
import { 
  Search as SearchIcon, 
  MapPin, 
  Filter, 
  ChevronDown, 
  Star,
  SlidersHorizontal,
  ArrowUpDown,
  DollarSign,
  Grid
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Venue {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: number;
  startingPrice: number;
  image: string;
  type: string;
}

const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Luxe Beauty Salon',
    rating: 4.9,
    reviews: 128,
    distance: 0.8,
    startingPrice: 50,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    type: 'Salon'
  },
  {
    id: '2',
    name: 'Serenity Spa & Wellness',
    rating: 4.8,
    reviews: 256,
    distance: 1.2,
    startingPrice: 75,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    type: 'Spa'
  },
  {
    id: '3',
    name: 'Modern Nails Studio',
    rating: 4.7,
    reviews: 89,
    distance: 1.5,
    startingPrice: 35,
    image: 'https://images.unsplash.com/photo-1598104358204-87cefc7c5986?q=80&w=2109?auto=format&fit=crop&q=80&w=800',
    type: 'Nails'
  },
  {
    id: '4',
    name: 'Elite Hair Design',
    rating: 4.9,
    reviews: 167,
    distance: 0.5,
    startingPrice: 45,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
    type: 'Salon'
  },
  {
    id: '5',
    name: 'Zen Day Spa',
    rating: 4.8,
    reviews: 203,
    distance: 2.1,
    startingPrice: 80,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800',
    type: 'Spa'
  },
  {
    id: '6',
    name: 'Glamour Beauty Bar',
    rating: 4.6,
    reviews: 145,
    distance: 1.8,
    startingPrice: 40,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    type: 'Salon'
  }
];

const SearchPage = () => {
  const navigate = useNavigate();
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Recommended');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [selectedType, setSelectedType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');

  const handleVenueClick = (venue: Venue) => {
    navigate('/book', { state: { selectedVenue: venue } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Header - Fixed at top */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
        {/* Primary Search Bar */}
        <div className="p-3">
          <div className="relative h-12 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-800">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="All treatments"
              className="w-full h-full pl-10 pr-10 rounded-xl text-sm font-roboto focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <SlidersHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-3 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm whitespace-nowrap">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm whitespace-nowrap">
              <ArrowUpDown className="w-4 h-4" />
              <span>{selectedSort}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm whitespace-nowrap">
              <DollarSign className="w-4 h-4" />
              <span>{selectedPrice}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm whitespace-nowrap">
              <Grid className="w-4 h-4" />
              <span>{selectedType}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div 
        className={`relative transition-all duration-400 ease-in-out ${
          isMapExpanded ? 'h-screen' : 'h-[25vh]'
        }`}
      >
        <div className="absolute inset-0">
          <img
            src="https://iili.io/39WPHSR.jpg?auto=format&fit=crop&q=80&w=1200"
            alt="Map with locations"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={() => setIsMapExpanded(!isMapExpanded)}
          className="absolute bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-white dark:bg-gray-800 rounded-full shadow-lg text-sm font-medium"
        >
          Search
        </button>
      </div>

      {/* Results Section */}
      <div className="px-3 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {mockVenues.map(venue => (
            <div 
              key={venue.id}
              onClick={() => handleVenueClick(venue)}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative aspect-square">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-[10px]">
                  {venue.distance} km
                </div>
              </div>
              <div className="p-1.5">
                <h3 className="text-xs font-medium text-gray-900 dark:text-white truncate">
                  {venue.name}
                </h3>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] text-gray-600 dark:text-gray-300">
                    {venue.rating}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    ({venue.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    From ${venue.startingPrice}
                  </span>
                  <button className="px-2 py-0.5 bg-rose-500 text-white text-[10px] rounded hover:bg-rose-600 transition-colors">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;