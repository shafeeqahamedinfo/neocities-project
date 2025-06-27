import React from 'react';
import { BookOpen } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <BookOpen className="h-16 w-16 text-indigo-600 mx-auto mb-4 animate-pulse" />
          <div className="absolute inset-0 animate-spin">
            <div className="h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading EduConnect</h2>
        <p className="text-gray-600">Connecting to the global discussion board...</p>
      </div>
    </div>
  );
};