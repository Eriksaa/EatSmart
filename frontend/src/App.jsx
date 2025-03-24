import React, { useState, useEffect } from "react";
import Home from "./Home";
import RecipeRecommendations from "./RecipeRecommendations";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedProfile = localStorage.getItem('userProfile');
    
    if (storedAuth === 'true' && storedProfile) {
      setIsAuthenticated(true);
      setUserProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUserProfile({
      name: "Demo User",
      preferences: [],
      allergies: []
    });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userProfile', JSON.stringify({
      name: "Demo User",
      preferences: [],
      allergies: []
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userProfile');
    setCurrentPage("home");
  };

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <Home onPageChange={handlePageChange} />;
      case "recipes":
        return <RecipeRecommendations userProfile={userProfile} />;
      case "food-analysis":
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Food Analysis</h2>
            <p>Coming Soon!</p>
          </div>
        );
      case "about":
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">About EatSmart</h2>
            <p>Coming Soon!</p>
          </div>
        );
      case "login":
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Demo Login
            </button>
          </div>
        );
      default:
        return <Home onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={() => handlePageChange("home")} className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">Eat</span>
                <span className="text-2xl font-bold text-gray-900">Smart</span>
              </button>
            </div>
            <div className="flex items-center space-x-8">
              <button onClick={() => handlePageChange("home")} className="text-gray-700 hover:text-gray-900">
                Home
              </button>
              <button onClick={() => handlePageChange("recipes")} className="text-gray-700 hover:text-gray-900">
                Recipes
              </button>
              <button onClick={() => handlePageChange("food-analysis")} className="text-gray-700 hover:text-gray-900">
                Food Analysis
              </button>
              <button onClick={() => handlePageChange("about")} className="text-gray-700 hover:text-gray-900">
                About
              </button>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => handlePageChange("login")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Log in / Sign up
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
