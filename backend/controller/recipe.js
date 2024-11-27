const { Recipes } = require("../sequelize/models/models");

const getRecipes = async(req, res) => {
  const recipes = await Recipes.findAll();

  return res.json(recipes);
};

const getRecipe = async (req, res) => {
  const recipeId = req.params.id; 

  try {
    const recipe = await Recipes.findByPk(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return res.status(500).json({ message: "Failed to fetch recipe" });
  }
};

const addRecipe = async(req, res) => {
  const {title, calories, mealTime, preparingTime, difficulty, instructions, userId} = req.body;

  if(!title || !calories || !mealTime || !preparingTime || !difficulty || !instructions || !userId) {
    res.json({message: "Required fields cannot be empty"});
  }

  try {
    const newRecipe = await Recipes.create({
      title, calories, mealTime, preparingTime, difficulty, instructions, userId
    });

    return res.json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ message: "Failed to create recipe" });
  }
};

const editRecipe = async (req, res) => {
  const { title, calories, mealTime, preparingTime, difficulty, instructions, userId } = req.body;
  
  try {
    let recipe = await Recipes.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    recipe.title = title;
    recipe.calories = calories;
    recipe.mealTime = mealTime;
    recipe.preparingTime = preparingTime;
    recipe.difficulty = difficulty;
    recipe.instructions = instructions;
    recipe.userId = userId;

    await recipe.save();

    return res.json(recipe);
  } catch (error) {
    console.error("Error editing recipe:", error);
    return res.status(500).json({ message: "Failed to edit recipe" });
  }
};

const deleteRecipe = (req, res) => {
  res.json({ message: "hello" });
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe };
