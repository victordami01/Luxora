import React from 'react';
import { Link } from 'react-router-dom';
import {
  Settings,
  CreditCard,
  Bell,
  Lock,
  LogOut,
  Crown,
  Calendar
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const ProfilePage = () => {
  const { user, logout } = useUser();

  const menuItems = [
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Payment Methods', path: '/payment' },
    { icon: <Bell className="w-5 h-5" />, label: 'Notifications', path: '/notifications' },
    { icon: <Lock className="w-5 h-5" />, label: 'Privacy & Security', path: '/privacy' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
              />
              {user.isPremium && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-1.5 rounded-full">
                  <Crown className="w-4 h-4" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-white/80">{user.email}</p>
              {user.isPremium && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-sm mt-2">
                  <Crown className="w-4 h-4" /> Premium Member
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-rose-500 font-semibold">{user.stats.bookings}</div>
            <div className="text-gray-600 text-sm">Bookings</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-rose-500 font-semibold">{user.stats.reviews}</div>
            <div className="text-gray-600 text-sm">Reviews</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-rose-500 font-semibold">{user.stats.points}</div>
            <div className="text-gray-600 text-sm">Points</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-gray-500">{item.icon}</div>
              <span className="text-gray-800 font-medium">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={logout}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow w-full"
          >
            <div className="text-gray-500">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="text-gray-800 font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Book Now Button */}
      <Link
        to="/book"
        className="fixed bottom-20 right-4 z-40 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
      >
        <Calendar className="w-5 h-5" />
        <span>Book Now</span>
      </Link>
    </div>
  );
};

export default ProfilePage;