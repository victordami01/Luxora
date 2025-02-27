import React, { createContext, useContext, useState } from 'react';

interface UserStats {
  bookings: number;
  reviews: number;
  points: number;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  isPremium: boolean;
  stats: UserStats;
}

interface UserContextType {
  user: UserProfile;
  logout: () => void;
}

const defaultUser: UserProfile = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
  isPremium: true,
  stats: {
    bookings: 12,
    reviews: 8,
    points: 2450
  }
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const logout = () => {
    // Implement logout logic here
    console.log('User logged out');
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};