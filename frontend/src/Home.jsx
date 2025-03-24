import React, { useRef } from 'react';

const Home = ({ onPageChange, isAuthenticated }) => {
  const featuresRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigation = (targetPage) => {
    if (!isAuthenticated && (targetPage === 'recipes' || targetPage === 'food-analysis')) {
      onPageChange('signup');
    } else {
      onPageChange(targetPage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation Bar */}
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
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4">
        <div className="animate-fade-in">
          <h1 className="mt-16 mb-8">
            <span className="block text-6xl font-bold text-blue-600 mb-2">Smart Eating.</span>
            <span className="block text-6xl font-bold text-gray-900">Smart Living.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your AI-powered companion for personalized recipe recommendations and nutritional insights
          </p>
          <div className="space-x-4">
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="bg-white text-gray-600 border-2 border-gray-600 px-8 py-3 rounded-lg text-lg font-semibold hover-transform hover-shadow-lg transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection(featuresRef)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm text-blue-600 font-semibold tracking-wide uppercase">Features</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Powered by blockchain & decentralized AI</h2>
            <p className="mt-4 text-lg text-gray-600">
              EatSmart leverages cutting-edge technology to provide secure, private, and accurate services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4 mx-auto">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Decentralized AI</h3>
              <p className="text-gray-600 text-center">
                Our AI models run on the Internet Computer Protocol, ensuring your data stays private and secure while providing accurate recommendations.
              </p>
              <div className="mt-4 text-center">
                <button
                  onClick={() => handleNavigation('recipes')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Try Recipes →
                </button>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4 mx-auto">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Photo Analysis</h3>
              <p className="text-gray-600 text-center">
                Instantly analyze the nutritional content of your food with just a photo, powered by our advanced AI image recognition.
              </p>
              <div className="mt-4 text-center">
                <button
                  onClick={() => handleNavigation('food-analysis')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Try Food Analysis →
                </button>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4 mx-auto">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Blockchain Security</h3>
              <p className="text-gray-600 text-center">
                All data and transactions are secured by blockchain technology, giving you complete control over your information.
              </p>
            </div>
          </div>

          {/* Why Choose EatSmartly Section */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why choose EatSmartly?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">✓</div>
                </div>
                <div className="ml-4">
                  <p className="text-base text-gray-700">Privacy-first approach with blockchain technology</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">✓</div>
                </div>
                <div className="ml-4">
                  <p className="text-base text-gray-700">Personalized recipe recommendations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">✓</div>
                </div>
                <div className="ml-4">
                  <p className="text-base text-gray-700">Accurate nutrition analysis</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">✓</div>
                </div>
                <div className="ml-4">
                  <p className="text-base text-gray-700">Sustainable and energy-efficient AI processing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile App Section */}
          <div className="mt-20 bg-blue-50 rounded-2xl p-8">
            <div className="text-center">
              <span className="text-sm text-blue-600 font-semibold tracking-wide uppercase">Coming Soon</span>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-2">EatSmart Mobile App</h2>
              <p className="text-gray-600 mb-6">
                Take EatSmart with you everywhere. Our mobile app will be available soon for iOS and Android.
              </p>
              <button className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold">Eat</span>
              <span className="text-sm text-blue-600 font-semibold">Smart</span>
            </div>
            <p className="text-sm text-gray-500">
              A blockchain-based platform with decentralized AI for personalized recipe recommendations and food nutrition analysis on the Internet Computer Protocol.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 EatSmart. All rights reserved.
              <span className="ml-2 text-blue-600">•</span>
              <span className="ml-2">Powered by Internet Computer Protocol</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
