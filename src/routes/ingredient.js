const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /recipes - Fetch recipes by ingredients
router.get('/', async (req, res) => {
  const ingredients = req.query.ingredients;
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${encodeURIComponent(ingredients)}&number=100&ranking=2`;

  try {
    const response = await axios.get(url);
    const filteredRecipes = response.data.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      usedIngredients: recipe.usedIngredients,
      missedIngredients: recipe.missedIngredients,
    }));
    res.status(200).json(filteredRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

// GET /recipes/:id - Fetch individual recipe details by ID
router.get('/:id', async (req, res) => {
  const recipeId = req.params.id;
  console.log(`Received request for recipe ID: ${recipeId}`);

  const apiKey = process.env.SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const recipeDetails = {
      id: response.data.id,
      title: response.data.title,
      image: response.data.image,
      ingredients: response.data.extendedIngredients.map(ingredient => ingredient.name),
      steps: response.data.analyzedInstructions.length > 0 ? response.data.analyzedInstructions[0].steps : []
    };
    console.log(recipeDetails);
    res.status(200).json(recipeDetails);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    res.status(500).json({ message: 'Error fetching recipe details' });
  }
});

module.exports = router;
