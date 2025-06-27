import React from 'react';
import { BookOpen, Users, MessageCircle } from 'lucide-react';

interface HeaderProps {
  currentUser: { name: string; type: 'student' | 'teacher' };
  onUserTypeChange: (type: 'student' | 'teacher') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onUserTypeChange }) => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-xl font-bold">annamalai university</h1>
          </div>
          
      
        </div>
      </div>
    </header>
  );
};