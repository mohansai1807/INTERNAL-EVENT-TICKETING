import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="mt-1 text-sm text-red-600 font-medium animate-pulse" id="error-message">
      {message}
    </div>
  );
};
