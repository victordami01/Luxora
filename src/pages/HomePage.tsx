import React from 'react';
import { Sparkles, DollarSign } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import ServiceCard from '../components/ServiceCard';
import OfferCard from '../components/OfferCard';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<DollarSign className="w-6 h-6 text-rose-500" />}
              title="Reasonable Prices"
              description="Quality services and products at competitive prices you'll love"
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6 text-rose-500" />}
              title="More Options to Choose From"
              description="Extensive selection of services and products to match your style"
            />
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <OfferCard
              title="New Client Special"
              description="Get 20% off your first booking"
              bgColor="bg-gradient-to-r from-purple-500 to-rose-500"
            />
            <OfferCard
              title="Free Hair Treatment"
              description="Spa Services or Beauty Service"
              bgColor="bg-gradient-to-r from-rose-500 to-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              image="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800"
              title="Hair Styling"
              rating={4.9}
              price="From $50"
            />
            <ServiceCard
              image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"
              title="Makeup"
              rating={4.8}
              price="From $40"
            />
            <ServiceCard
              image="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=800"
              title="Nail Care"
              rating={4.7}
              price="From $30"
            />
            <ServiceCard
              image="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"
              title="Fashion Products"
              rating={4.9}
              price="From $25"
            />
            <ServiceCard
              image="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800"
              title="Fashion Clothing"
              rating={4.8}
              price="From $45"
            />
            <ServiceCard
              image="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800"
              title="Footwear"
              rating={4.7}
              price="From $60"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;