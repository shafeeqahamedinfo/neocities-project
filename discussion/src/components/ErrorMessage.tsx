import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <p className="text-red-800 font-medium">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};