import React, { useState } from 'react';

const INGREDIENT_CATEGORIES = [
  'Fruits',
  'Vegetables',
  'Meats',
  'Seafood',
  'Dairy',
  'Grains',
  'Spices',
  'Herbs',
  'Condiments',
  'Others'
];

const INGREDIENTS_BY_CATEGORY = {
  'Fruits': [
    'Apple', 'Banana', 'Orange', 'Strawberry', 'Blueberry', 'Mango', 'Pineapple', 'Grape', 
    'Lemon', 'Lime', 'Peach', 'Pear', 'Watermelon', 'Cantaloupe', 'Kiwi', 'Raspberry',
    'Blackberry', 'Pomegranate', 'Plum', 'Apricot', 'Cherry', 'Fig', 'Guava', 'Passion Fruit',
    'Dragon Fruit', 'Papaya', 'Coconut', 'Avocado'
  ],
  'Vegetables': [
    'Carrot', 'Broccoli', 'Spinach', 'Tomato', 'Potato', 'Onion', 'Garlic', 'Bell Pepper',
    'Cucumber', 'Lettuce', 'Mushroom', 'Zucchini', 'Eggplant', 'Cauliflower', 'Asparagus',
    'Green Beans', 'Peas', 'Corn', 'Sweet Potato', 'Cabbage', 'Brussels Sprouts', 'Kale',
    'Celery', 'Radish', 'Beetroot', 'Turnip', 'Artichoke', 'Leek', 'Bok Choy', 'Swiss Chard',
    'Watercress', 'Arugula', 'Endive', 'Fennel', 'Parsnip', 'Rutabaga', 'Shallot'
  ],
  'Meats': [
    'Chicken Breast', 'Chicken Thigh', 'Ground Beef', 'Beef Steak', 'Pork Chop', 'Bacon',
    'Turkey', 'Lamb Chop', 'Ground Lamb', 'Ham', 'Sausage', 'Ground Turkey', 'Veal',
    'Duck Breast', 'Beef Brisket', 'Beef Ribs', 'Pork Belly', 'Pork Tenderloin',
    'Ground Pork', 'Chicken Wings', 'Beef Chuck', 'Beef Sirloin', 'Lamb Leg',
    'Turkey Breast', 'Chicken Liver', 'Beef Liver'
  ],
  'Seafood': [
    'Salmon', 'Tuna', 'Shrimp', 'Cod', 'Tilapia', 'Crab', 'Lobster', 'Mussels',
    'Scallops', 'Sardines', 'Halibut', 'Sea Bass', 'Trout', 'Mackerel', 'Swordfish',
    'Oysters', 'Clams', 'Squid', 'Octopus', 'Red Snapper', 'Flounder', 'Catfish',
    'Anchovy', 'Mahi Mahi', 'Barramundi', 'Arctic Char'
  ],
  'Dairy': [
    'Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Sour Cream', 'Cream Cheese',
    'Mozzarella', 'Cheddar', 'Parmesan', 'Ricotta', 'Cottage Cheese', 'Feta',
    'Gouda', 'Brie', 'Blue Cheese', 'Swiss Cheese', 'Provolone', 'Mascarpone',
    'Greek Yogurt', 'Heavy Cream', 'Half and Half', 'Buttermilk', 'Whipped Cream',
    'Goat Cheese', 'Romano', 'Asiago'
  ],
  'Grains': [
    'Rice', 'White Rice', 'Brown Rice', 'Pasta', 'Spaghetti', 'Penne', 'Bread',
    'Quinoa', 'Oats', 'Flour', 'Cornmeal', 'Cereal', 'Couscous', 'Barley',
    'Whole Wheat Flour', 'Rye Flour', 'Buckwheat', 'Millet', 'Semolina',
    'Farro', 'Wild Rice', 'Arborio Rice', 'Jasmine Rice', 'Basmati Rice',
    'Tortillas', 'Pita Bread', 'Bagels', 'Noodles', 'Rice Noodles'
  ],
  'Spices': [
    'Black Pepper', 'Salt', 'Cumin', 'Paprika', 'Cinnamon', 'Turmeric', 'Oregano',
    'Basil', 'Thyme', 'Rosemary', 'Cayenne Pepper', 'Chili Powder', 'Garlic Powder',
    'Onion Powder', 'Ginger', 'Nutmeg', 'Cardamom', 'Coriander', 'Fennel Seeds',
    'Star Anise', 'Cloves', 'Bay Leaves', 'Saffron', 'Allspice', 'Mustard Seeds',
    'White Pepper', 'Red Pepper Flakes', 'Sumac', 'Za\'atar'
  ],
  'Herbs': [
    'Parsley', 'Cilantro', 'Mint', 'Dill', 'Sage', 'Chives', 'Bay Leaves',
    'Tarragon', 'Marjoram', 'Lemongrass', 'Thai Basil', 'Oregano', 'Thyme',
    'Rosemary', 'Basil', 'Lavender', 'Fennel', 'Chamomile', 'Sorrel',
    'Lovage', 'Borage', 'Savory', 'Hyssop', 'Lemon Verbena'
  ],
  'Condiments': [
    'Ketchup', 'Mustard', 'Mayonnaise', 'Soy Sauce', 'Hot Sauce', 'Olive Oil',
    'Vinegar', 'Honey', 'Maple Syrup', 'BBQ Sauce', 'Worcestershire Sauce',
    'Fish Sauce', 'Oyster Sauce', 'Hoisin Sauce', 'Teriyaki Sauce', 'Tahini',
    'Pesto', 'Sriracha', 'Ranch Dressing', 'Italian Dressing', 'Balsamic Vinegar',
    'Rice Vinegar', 'Apple Cider Vinegar', 'Sesame Oil', 'Coconut Oil',
    'Vegetable Oil', 'Canola Oil', 'Mirin', 'Gochujang', 'Miso Paste'
  ],
  'Others': [
    'Nuts', 'Almonds', 'Walnuts', 'Cashews', 'Pistachios', 'Pine Nuts',
    'Seeds', 'Sunflower Seeds', 'Pumpkin Seeds', 'Chia Seeds', 'Flax Seeds',
    'Dried Fruits', 'Raisins', 'Dried Cranberries', 'Dried Apricots',
    'Chocolate', 'Dark Chocolate', 'Milk Chocolate', 'White Chocolate',
    'Coconut', 'Shredded Coconut', 'Coconut Milk', 'Tofu', 'Tempeh',
    'Seaweed', 'Nori', 'Miso', 'Nutritional Yeast', 'Protein Powder',
    'Baking Powder', 'Baking Soda', 'Yeast', 'Vanilla Extract'
  ]
};

const UNITS = {
  'Fruits': ['piece(s)', 'gram(s)', 'cup(s)', 'pound(s)'],
  'Vegetables': ['gram(s)', 'piece(s)', 'cup(s)', 'pound(s)', 'bunch(es)'],
  'Meats': ['gram(s)', 'pound(s)', 'ounce(s)', 'kilogram(s)'],
  'Seafood': ['gram(s)', 'pound(s)', 'ounce(s)', 'fillet(s)', 'piece(s)'],
  'Dairy': ['gram(s)', 'cup(s)', 'tablespoon(s)', 'ounce(s)', 'pound(s)', 'milliliter(s)'],
  'Grains': ['gram(s)', 'cup(s)', 'pound(s)', 'ounce(s)'],
  'Spices': ['teaspoon(s)', 'tablespoon(s)', 'gram(s)', 'pinch(es)'],
  'Herbs': ['teaspoon(s)', 'tablespoon(s)', 'gram(s)', 'sprig(s)', 'bunch(es)'],
  'Condiments': ['tablespoon(s)', 'cup(s)', 'gram(s)', 'milliliter(s)', 'teaspoon(s)'],
  'Others': ['gram(s)', 'cup(s)', 'piece(s)', 'ounce(s)', 'tablespoon(s)']
};

function RecipeRecommendations({ userProfile }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    unit: '',
    category: ''
  });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setNewIngredient({
      name: '',
      quantity: '',
      unit: UNITS[category][0],
      category: category
    });
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (!newIngredient.name || !newIngredient.quantity || parseFloat(newIngredient.quantity) <= 0) {
      setError('Please enter a valid quantity greater than 0');
      return;
    }

    // Check if ingredient already exists
    const existingIngredient = ingredients.find(ing => ing.name === newIngredient.name);
    if (existingIngredient) {
      setError('This ingredient is already in your list');
      return;
    }

    setError(null);
    setIngredients([...ingredients, { 
      ...newIngredient, 
      id: Date.now(),
      quantity: parseFloat(newIngredient.quantity).toFixed(2) // Format to 2 decimal places
    }]);
    setNewIngredient({
      name: '',
      quantity: '',
      unit: UNITS[selectedCategory][0],
      category: selectedCategory
    });
  };

  const handleRemoveIngredient = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const handleGetRecipes = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Format ingredients for the backend
      const ingredientsList = ingredients.map(ing => 
        `${ing.quantity} ${ing.unit} of ${ing.name}`
      ).join(', ');

      console.log("Sending ingredients:", ingredientsList);

      // Show loading state with placeholder images
      setRecipes([{
        name: "Analyzing ingredients...",
        description: "Creating personalized recipes based on your ingredients...",
        cookingTime: "...",
        difficulty: "...",
        servings: "...",
        calories: "...",
        ingredients: [],
        instructions: [],
        tips: [],
        nutritionalInfo: {},
        imageUrl: "https://source.unsplash.com/featured/?cooking,preparation"
      }]);

      // Call the backend service
      try {
        console.log("Connecting to backend...");
        const actor = await window.canister.llm_service;
        const result = await actor.queryText(ingredientsList);
        
        if (result.err) {
          console.error('Error from backend:', result.err);
          throw new Error(JSON.stringify(result.err));
        }

        const response = result.ok;
        console.log("Backend response:", response);
        
        // Parse the response
        const parsedResponse = JSON.parse(response);
        console.log("Parsed response:", parsedResponse);

        if (!parsedResponse.recipes || !Array.isArray(parsedResponse.recipes)) {
          throw new Error('Invalid response format');
        }

        // Add images to recipes
        const recipesWithImages = await Promise.all(parsedResponse.recipes.map(async (recipe, index) => {
          // Create a unique search term for each recipe
          const mainIngredients = ingredients
            .slice(0, 3)
            .map(ing => ing.name.toLowerCase())
            .join(',');

          // Generate different image search terms for each recipe
          let imageSearchTerm;
          switch (index) {
            case 0:
              imageSearchTerm = `gourmet,dish,${mainIngredients}`;
              break;
            case 1:
              imageSearchTerm = `healthy,bowl,${mainIngredients}`;
              break;
            case 2:
              imageSearchTerm = `quick,meal,${mainIngredients}`;
              break;
            default:
              imageSearchTerm = `food,${mainIngredients}`;
          }

          // Add random parameter to prevent caching
          const timestamp = Date.now();
          const imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(imageSearchTerm)}&${timestamp}`;

          return {
            ...recipe,
            imageUrl
          };
        }));

        setRecipes(recipesWithImages);
        setError(null);

      } catch (error) {
        console.error('Error generating recipes:', error);
        setError('Failed to generate recipes. Please try again.');
        setRecipes([]);
      }

    } finally {
      setLoading(false);
    }
  };

  // Helper function to determine recipe style based on ingredients
  const determineRecipeStyle = (ingredients) => {
    const categories = ingredients.map(ing => ing.category);
    
    if (categories.includes('Meats') || categories.includes('Seafood')) {
      return "main dish";
    } else if (categories.includes('Vegetables') && categories.includes('Grains')) {
      return "vegetarian main";
    } else if (categories.includes('Fruits') && categories.includes('Dairy')) {
      return "dessert";
    }
    
    return "main dish"; // default to main dish
  };

  // Helper function to generate recipes based on ingredients
  const generateRecipesFromIngredients = (ingredients, recipeStyle) => {
    // Group ingredients by category
    const ingredientsByCategory = ingredients.reduce((acc, ing) => {
      if (!acc[ing.category]) {
        acc[ing.category] = [];
      }
      acc[ing.category].push(ing);
      return acc;
    }, {});

    // Generate recipes based on available ingredients
    const recipes = [];
    
    // Example recipe generation based on ingredient combinations
    if (recipeStyle === "main dish") {
      if (ingredientsByCategory['Meats'] && ingredientsByCategory['Vegetables']) {
        recipes.push({
          name: "Stir-Fried Meat with Vegetables",
          description: "A quick and healthy stir-fry using your available meat and vegetables",
          cookingTime: "25 minutes",
          difficulty: "Easy",
          servings: "4",
          calories: "350 per serving",
          ingredients: [
            ...ingredientsByCategory['Meats'].map(ing => `${ing.quantity} ${ing.unit} ${ing.name}`),
            ...ingredientsByCategory['Vegetables'].map(ing => `${ing.quantity} ${ing.unit} ${ing.name}`),
            "2 tbsp oil",
            "2 cloves garlic, minced",
            "1 tbsp soy sauce",
            "Salt and pepper to taste"
          ],
          instructions: [
            "Cut meat into thin strips",
            "Prepare vegetables by cutting into uniform pieces",
            "Heat oil in a wok or large pan",
            "Stir-fry meat until browned",
            "Add vegetables and stir-fry until crisp-tender",
            "Add garlic and soy sauce",
            "Season with salt and pepper"
          ],
          tips: [
            "Cut all ingredients to similar sizes for even cooking",
            "Have all ingredients prepped before starting",
            "Cook on high heat for best results"
          ],
          nutritionalInfo: {
            protein: "30g",
            carbs: "15g",
            fat: "20g",
            fiber: "5g",
            sodium: "600mg"
          },
          imageUrl: "https://source.unsplash.com/featured/?stirfry"
        });
      }
    }

    if (recipeStyle === "vegetarian main") {
      if (ingredientsByCategory['Vegetables'] && ingredientsByCategory['Grains']) {
        recipes.push({
          name: "Vegetable Grain Bowl",
          description: "A nutritious bowl combining your available vegetables and grains",
          cookingTime: "30 minutes",
          difficulty: "Easy",
          servings: "4",
          calories: "320 per serving",
          ingredients: [
            ...ingredientsByCategory['Grains'].map(ing => `${ing.quantity} ${ing.unit} ${ing.name}`),
            ...ingredientsByCategory['Vegetables'].map(ing => `${ing.quantity} ${ing.unit} ${ing.name}`),
            "2 tbsp olive oil",
            "2 cloves garlic, minced",
            "1 lemon, juiced",
            "Salt and pepper to taste"
          ],
          instructions: [
            "Cook grains according to package instructions",
            "While grains cook, prepare vegetables",
            "Heat oil in a pan",
            "Sauté vegetables until tender",
            "Add garlic and cook for 1 minute",
            "Combine with cooked grains",
            "Dress with lemon juice",
            "Season with salt and pepper"
          ],
          tips: [
            "Cook grains in vegetable broth for more flavor",
            "Keep vegetables slightly crisp for better texture",
            "Can be served warm or cold"
          ],
          nutritionalInfo: {
            protein: "12g",
            carbs: "45g",
            fat: "14g",
            fiber: "8g",
            sodium: "400mg"
          },
          imageUrl: "https://source.unsplash.com/featured/?grainbowl"
        });
      }
    }

    if (recipeStyle === "dessert") {
      if (ingredientsByCategory['Fruits'] && ingredientsByCategory['Dairy']) {
        recipes.push({
          name: "Fresh Fruit Parfait",
          description: "A light and refreshing dessert using your available fruits and dairy",
          cookingTime: "15 minutes",
          difficulty: "Easy",
          servings: "4",
          calories: "280 per serving",
          ingredients: [
            ...ingredientsByCategory['Fruits'].map(ing => `${ing.quantity} ${ing.unit} ${ing.name}`),
            ...ingredientsByCategory['Dairy'].map(ing => `${ing.quantity} ${ing.unit} ${ing.name}`),
            "2 tbsp honey",
            "1 tsp vanilla extract"
          ],
          instructions: [
            "Wash and prepare fruits",
            "Layer yogurt in serving glasses",
            "Add a layer of fruits",
            "Repeat layers",
            "Top with remaining fruits",
            "Drizzle with honey",
            "Serve immediately"
          ],
          tips: [
            "Use ripe, seasonal fruits for best flavor",
            "Can be made ahead and refrigerated",
            "Add granola for extra crunch"
          ],
          nutritionalInfo: {
            protein: "8g",
            carbs: "35g",
            fat: "12g",
            fiber: "4g",
            sodium: "60mg"
          },
          imageUrl: "https://source.unsplash.com/featured/?parfait"
        });
      }
    }

    // Add more recipe variations based on ingredient combinations
    // ...

    return recipes;
  };

    return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-900 mb-8">Recipe Recommendations</h1>
      
      {/* Category Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-primary-800 mb-4">Select Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {INGREDIENT_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors
                ${selectedCategory === category 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredient Selection */}
      {selectedCategory && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">
            Add {selectedCategory}
          </h2>
          <form onSubmit={handleAddIngredient} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Select {selectedCategory}
                </label>
                <select
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select an ingredient</option>
                  {INGREDIENTS_BY_CATEGORY[selectedCategory].map(ingredient => (
                    <option key={ingredient} value={ingredient}>{ingredient}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={newIngredient.quantity}
                  onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Amount"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Unit
                </label>
                <select
                  value={newIngredient.unit}
                  onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  {UNITS[selectedCategory].map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Ingredient
            </button>
          </form>
        </div>
      )}

      {/* Ingredients List */}
      {ingredients.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">Your Ingredients</h2>
          <div className="space-y-2">
            {ingredients.map(ing => (
              <div key={ing.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-md">
                <span className="text-secondary-800">
                  {ing.quantity} {ing.unit} of {ing.name} ({ing.category})
                </span>
                <button
                  onClick={() => handleRemoveIngredient(ing.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleGetRecipes}
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            disabled={loading}
          >
            {loading ? 'Generating Recipes...' : 'Get Recipe Suggestions'}
          </button>
      </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Recipe Results */}
      {recipes.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary-800 mb-4">Suggested Recipes</h2>
          {recipes.map((recipe, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
              </div>
            <div className="p-6">
                <h3 className="text-2xl font-semibold text-primary-700 mb-2">{recipe.name}</h3>
                <p className="text-secondary-600 mb-4">{recipe.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <span className="font-medium text-secondary-700">Cooking Time:</span>
                    <span className="ml-2 text-secondary-600">{recipe.cookingTime}</span>
                  </div>
                  <div>
                    <span className="font-medium text-secondary-700">Difficulty:</span>
                    <span className="ml-2 text-secondary-600">{recipe.difficulty}</span>
                  </div>
                  <div>
                    <span className="font-medium text-secondary-700">Servings:</span>
                    <span className="ml-2 text-secondary-600">{recipe.servings}</span>
                  </div>
                  <div>
                    <span className="font-medium text-secondary-700">Calories:</span>
                    <span className="ml-2 text-secondary-600">{recipe.calories}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-secondary-700 mb-2">Ingredients Needed:</h4>
                  <ul className="list-disc list-inside text-secondary-600 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-secondary-700 mb-2">Cooking Instructions:</h4>
                  <ol className="list-decimal list-inside text-secondary-600 space-y-2">
                    {recipe.instructions.map((step, i) => (
                      <li key={i} className="pl-2">{step}</li>
                    ))}
                  </ol>
              </div>

                <div className="mb-6">
                  <h4 className="font-medium text-secondary-700 mb-2">Tips for Best Results:</h4>
                  <ul className="list-disc list-inside text-secondary-600 space-y-1">
                    {recipe.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div>
                  <h4 className="font-medium text-secondary-700 mb-2">Nutritional Information:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-secondary-600">
                    {Object.entries(recipe.nutritionalInfo).map(([key, value]) => (
                      <div key={key}>
                        <span className="capitalize">{key}:</span>
                        <span className="ml-2">{value}</span>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}

export default RecipeRecommendations; 