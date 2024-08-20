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
  totalTime: String
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

// POST route to add a new item
router.post('/protected', async(req, res) => {
  const { password } = req.body;

  if (await verifyAdminPassword(password)) {
    // Perform the create operation
    try {
      const recipe = new Recipe(req.body);
      await recipe.save();
      res.status(201).json(recipe);
  } catch (error) {
      res.status(400).json({ error: 'Error saving recipe' });
  }
    res.status(201).send('Resource created');
  } else {
    res.status(401).send('Unauthorized');
  }
});

// GET route to fetch all items (if needed)
router.get('/', async (req, res) => {
    try {
        const foods = await Recipe.find();
        res.json(foods);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    router.get('/:id', async (req, res) => {
      try {
          const foods = await Recipe.findById(req.params.id);
          res.json(foods);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });

module.exports = router;
