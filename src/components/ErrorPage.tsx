import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCcw, FileQuestion } from 'lucide-react';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isServerError, setIsServerError] = useState(false);

  useEffect(() => {
    // Check if it's a server error (50x) or a client error (404, etc.)
    // We'll consider it a server error if the path is exactly /50x.html
    // Otherwise, it's a "page not found" error
    setIsServerError(location.pathname === '/50x.html');
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-primary-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          {isServerError ? (
            <AlertTriangle size={64} className="text-section-amber-light dark:text-section-amber-dark" />
          ) : (
            <FileQuestion size={64} className="text-section-blue-light dark:text-section-blue-dark" />
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4">
          {isServerError ? 'Server Error' : 'Page Not Found'}
        </h1>
        
        <p className="text-primary-600 dark:text-primary-300 mb-8">
          {isServerError ? (
            'There is an unknown technical problem. I have been notified and will resolve the issue soon.'
          ) : (
            'The page you are looking for doesn\'t exist or has been moved.'
          )}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isServerError && (
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-section-blue-light/10 dark:bg-section-blue-dark/10 text-section-blue-light dark:text-section-blue-dark hover:bg-section-blue-light/20 dark:hover:bg-section-blue-dark/20 transition-colors"
            >
              <RefreshCcw size={18} className="mr-2" />
              Try Again
            </button>
          )}
          
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-section-green-light/10 dark:bg-section-green-dark/10 text-section-green-light dark:text-section-green-dark hover:bg-section-green-light/20 dark:hover:bg-section-green-dark/20 transition-colors"
          >
            <Home size={18} className="mr-2" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;