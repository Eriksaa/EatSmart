import React from 'react';

const Navbar = ({ onPageChange, isAuthenticated }) => {
  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => onPageChange('home')}
              className="flex items-center space-x-2"
            >
              <span className="text-xl font-bold">Eat</span>
              <span className="text-xl font-bold text-blue-600">Smart</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onPageChange('recipes')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Recipes
            </button>
            <button
              onClick={() => onPageChange('food-analysis')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Food Analysis
            </button>
            {isAuthenticated ? (
              <button
                onClick={() => onPageChange('profile')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Profile
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onPageChange('login')}
                  className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-600 hover:border-blue-700 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => onPageChange('signup')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 