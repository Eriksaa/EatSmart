import React, { useState } from 'react';

function FoodAnalysis({ userProfile }) {
  const [foodImage, setFoodImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodImage) {
      setError('Please select an image to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Convert image to blob
      const arrayBuffer = await foodImage.arrayBuffer();
      const blob = new Blob([arrayBuffer]);

      const response = await window.canister.eatsmart_backend.analyzeFoodPhoto(blob);
      if (response.ok) {
        setAnalysis(response.ok);
      } else {
        throw new Error(response.err || 'Failed to analyze food');
      }
    } catch (err) {
      setError('Failed to analyze food. Please try again.');
      console.error('Error analyzing food:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Food Analysis
          </h1>
          <p className="text-xl text-secondary-600">
            Upload a photo of your food to get detailed nutritional information and insights.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="foodImage"
                className="block text-sm font-medium text-secondary-700 mb-2"
              >
                Upload Food Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-secondary-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {preview ? (
                    <div className="mb-4">
                      <img
                        src={preview}
                        alt="Food preview"
                        className="mx-auto h-48 w-auto rounded-lg"
                      />
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-secondary-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-secondary-600">
                    <label
                      htmlFor="foodImage"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="foodImage"
                        name="foodImage"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-secondary-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !foodImage}
              className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                loading || !foodImage
                  ? 'bg-primary-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
              }`}
            >
              {loading ? 'Analyzing...' : 'Analyze Food'}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {analysis && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-6">
              Analysis Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">
                  Food Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-secondary-500">Food Name</p>
                    <p className="text-lg font-medium text-secondary-900">
                      {analysis.foodName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">Health Score</p>
                    <div className="flex items-center">
                      <div className="h-2 w-full bg-secondary-200 rounded-full">
                        <div
                          className="h-2 bg-primary-600 rounded-full"
                          style={{ width: `${analysis.healthScore}%` }}
                        />
                      </div>
                      <span className="ml-2 text-lg font-medium text-secondary-900">
                        {analysis.healthScore}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-4">
                  Nutritional Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-secondary-500">Calories</p>
                      <p className="text-lg font-medium text-secondary-900">
                        {analysis.nutritionalInfo.calories} kcal
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary-500">Protein</p>
                      <p className="text-lg font-medium text-secondary-900">
                        {analysis.nutritionalInfo.protein}g
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary-500">Carbs</p>
                      <p className="text-lg font-medium text-secondary-900">
                        {analysis.nutritionalInfo.carbs}g
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary-500">Fat</p>
                      <p className="text-lg font-medium text-secondary-900">
                        {analysis.nutritionalInfo.fat}g
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-secondary-500">Vitamins</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {analysis.nutritionalInfo.vitamins.map((vitamin, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                        >
                          {vitamin}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-secondary-500">Minerals</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {analysis.nutritionalInfo.minerals.map((mineral, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                        >
                          {mineral}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-primary-800 mb-4">
                Recommendations
              </h3>
              <div className="bg-primary-50 rounded-lg p-4">
                <p className="text-secondary-800 whitespace-pre-line">
                  {analysis.recommendations}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodAnalysis; 