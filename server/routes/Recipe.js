const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { verifyAdminPassword } = require('../middleware/adminAuth');

// Define your Recipe model (if not already defined)
const RecipeSchema = new mongoose.Schema({
  dishName: String,
  ingredients: String,
  directions: String,
  prepTime: String,
  totalTime: String,
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

// POST route to add a new item
router.post('/', async (req, res) => {
  const { password, ...recipeData } = req.body;

  if (await verifyAdminPassword(password)) {
    // Perform the create operation
    try {
      const recipe = new Recipe(recipeData);
      await recipe.save();
      res.status(201).json(recipe);
    } catch (error) {
      res.status(400).json({ error: 'Error saving recipe' });
    }
  } else {
    res.status(401).send('Unauthorized');
  }
});

// GET route to fetch all items
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch a specific item by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
