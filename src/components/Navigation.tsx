import React from 'react';
import { Home, Search, Calendar, Heart, User, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const Navigation = () => {
  const location = useLocation();
  const { favorites } = useFavorites();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
      <div className="max-w-lg mx-auto flex justify-between items-center">
        <NavItem icon={<Home />} label="Home" path="/" isActive={isActive('/')} />
        <NavItem icon={<Search />} label="Search" path="/search" isActive={isActive('/search')} />
        <NavItem icon={<Calendar />} label="Book" path="/book" isActive={isActive('/book')} />
        <NavItem icon={<ShoppingBag />} label="Shop" path="/shop" isActive={isActive('/shop')} />
        <NavItem
          icon={<Heart className={favorites.length > 0 ? 'fill-rose-500' : ''} />}
          label="Favorites"
          path="/favorites"
          isActive={isActive('/favorites')}
          badge={favorites.length > 0 ? favorites.length : undefined}
        />
        <NavItem icon={<User />} label="Profile" path="/profile" isActive={isActive('/profile')} />
      </div>
    </nav>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, isActive, badge }) => (
  <Link
    to={path}
    className={`flex flex-col items-center gap-1 ${
      isActive ? 'text-rose-500' : 'text-gray-500 hover:text-rose-500'
    } transition-colors`}
  >
    <div className="relative w-6 h-6">
      {icon}
      {badge !== undefined && (
        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
    <span className="text-xs font-medium">{label}</span>
  </Link>
);

export default Navigation;