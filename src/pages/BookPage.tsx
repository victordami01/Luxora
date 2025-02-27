import React, { useState, useEffect } from 'react';
import { ChevronLeft, Star, Clock, CreditCard, Wallet, Building2, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
}

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

interface Stylist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  availability: string[];
}

const venues: Venue[] = [
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
    image: 'https://images.unsplash.com/photo-1610992015732-2449b0bb0a86?auto=format&fit=crop&q=80&w=800',
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

const stylists: Stylist[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    specialty: 'Hair Stylist & Colorist',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    availability: ['9:00 AM', '2:00 PM', '4:00 PM']
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialty: 'Senior Stylist',
    rating: 4.8,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    availability: ['10:00 AM', '1:00 PM', '3:00 PM']
  },
  {
    id: '3',
    name: 'Sarah Williams',
    specialty: 'Makeup Artist',
    rating: 4.9,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    availability: ['11:00 AM', '2:00 PM', '5:00 PM']
  }
];

const BookPage = () => {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedStylist, setSelectedStylist] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'wallet' | 'salon'>('credit');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(
    location.state?.selectedVenue || null
  );
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  const services: Service[] = [
    { id: '1', name: 'Haircut & Styling', price: '$50', duration: '1h' },
    { id: '2', name: 'Hair Coloring', price: '$120', duration: '2h' },
    { id: '3', name: 'Makeup Session', price: '$80', duration: '1h' },
    { id: '4', name: 'Nail Care', price: '$40', duration: '45m' },
  ];

  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: false },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true },
  ];

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/" className="mr-4">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Book Appointment</h1>
      </div>

      {/* Branch Selection */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Select Branch</h2>
        <select
          value={selectedVenue?.id || ''}
          onChange={(e) => {
            const venue = venues.find(v => v.id === e.target.value);
            setSelectedVenue(venue || null);
          }}
          className="w-full p-3 rounded-lg border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
        >
          <option value="">Choose a branch</option>
          {venues.map((venue) => (
            <option key={venue.id} value={venue.id}>
              {venue.name} ({venue.distance} km)
            </option>
          ))}
        </select>
      </section>

      {/* Calendar Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Select Date</h2>
          <button
            onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
            className="text-rose-500 text-sm font-medium"
          >
            {isCalendarExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
        
        <div className={`bg-white rounded-lg shadow-sm p-4 ${isCalendarExpanded ? '' : 'max-h-96 overflow-hidden'}`}>
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map((date, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(date)}
                disabled={!isSameMonth(date, currentMonth)}
                className={`
                  p-2 rounded-lg text-sm relative
                  ${!isSameMonth(date, currentMonth) ? 'text-gray-300' : ''}
                  ${isSameDay(date, selectedDate) ? 'bg-rose-500 text-white' : ''}
                  ${isToday(date) ? 'font-bold' : ''}
                  hover:bg-rose-50
                `}
              >
                {format(date, 'd')}
                {isToday(date) && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Time Selection */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Choose Time</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.time}
              disabled={!slot.available}
              onClick={() => setSelectedTime(slot.time)}
              className={`p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                selectedTime === slot.time
                  ? 'bg-rose-500 text-white'
                  : slot.available
                  ? 'bg-white text-gray-600 hover:bg-rose-50'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{slot.time}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Service Selection */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Select Service</h2>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
        >
          <option value="">Choose a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - {service.price} ({service.duration})
            </option>
          ))}
        </select>
      </section>

      {/* Stylist Selection */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Choose Stylist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stylists.map((stylist) => (
            <button
              key={stylist.id}
              onClick={() => setSelectedStylist(stylist.id)}
              className={`p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all ${
                selectedStylist === stylist.id ? 'ring-2 ring-rose-500' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">{stylist.name}</h3>
                  <p className="text-sm text-gray-500">{stylist.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {stylist.rating} ({stylist.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Payment Method */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Payment Method</h2>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setPaymentMethod('credit')}
            className={`p-4 rounded-lg flex items-center gap-3 transition-all ${
              paymentMethod === 'credit'
                ? 'bg-rose-500 text-white'
                : 'bg-white text-gray-600 hover:bg-rose-50'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>Credit Card</span>
          </button>
          <button
            onClick={() => setPaymentMethod('wallet')}
            className={`p-4 rounded-lg flex items-center gap-3 transition-all ${
              paymentMethod === 'wallet'
                ? 'bg-rose-500 text-white'
                : 'bg-white text-gray-600 hover:bg-rose-50'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span>Digital Wallet</span>
          </button>
          <button
            onClick={() => setPaymentMethod('salon')}
            className={`p-4 rounded-lg flex items-center gap-3 transition-all ${
              paymentMethod === 'salon'
                ? 'bg-rose-500 text-white'
                : 'bg-white text-gray-600 hover:bg-rose-50'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span>Pay in Salon</span>
          </button>
        </div>
      </section>

      {/* Book Now Button */}
      <button
        className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold hover:from-rose-600 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!selectedVenue || !selectedService || !selectedTime || !selectedStylist}
      >
        Book Now
      </button>
    </div>
  );
};

export default BookPage;