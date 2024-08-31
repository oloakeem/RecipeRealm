const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
require('dotenv').config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'disfrbfdt',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Define your Recipe model (if not already defined)
const RecipeSchema = new mongoose.Schema({
  dishName: String,
  ingredients: Array,
  directions: Array,
  author: String,
  servingSize : String,
  prepTime: String,
  totalTime: String,
  imageUrl:String,
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

// POST route to add a new item
// POST route to add a new item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';

    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error)return reject(error);
          resolve(result.url);
        }).end(req.file.buffer);
      });
    }

    // Add imageUrl to recipeData
    const recipeData = {
      ...req.body,
      imageUrl: imageUrl,
    };

    const recipe = new Recipe(recipeData);
    await recipe.save();
    res.status(201).json(recipe);

  } catch (error) {
    res.status(400).json({ error: 'Error saving recipe' });
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
