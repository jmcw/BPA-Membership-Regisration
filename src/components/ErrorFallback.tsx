import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex items-center space-x-3 text-red-600 mb-4">
          <AlertTriangle className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Something went wrong</h2>
        </div>
        <p className="text-gray-600 mb-4">
          We're sorry, but there was an error processing your request. Please try again or contact support if the problem persists.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="bg-gray-100 p-4 rounded text-sm mb-4 overflow-auto">
            {error.message}
          </pre>
        )}
        <button
          onClick={resetErrorBoundary}
          className="w-full bg-[#0B56A3] text-white py-2 px-4 rounded hover:bg-[#094282] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}