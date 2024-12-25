const { where } = require("sequelize");
const { Recipes } = require("../sequelize/models/models");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.fieldname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const getRecipes = async (req, res) => {
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

const addRecipe = async (req, res) => {
  console.log(req.user);

  const {
    title,
    calories,
    mealTime,
    preparingTime,
    difficulty,
    instructions,
    ingredients,
    userId,
  } = req.body;

  if (
    !title ||
    !calories ||
    !mealTime ||
    !preparingTime ||
    !difficulty ||
    !instructions ||
    !userId ||
    !ingredients
  ) {
    return res.status(400).json({ message: "Required fields cannot be empty" });
  }

  try {

    console.log(req.user);
    const newRecipe = await Recipes.create({
      title,
      calories,
      mealTime,
      preparingTime,
      difficulty,
      instructions,
      userId,
      ingredients,
      coverImage: req.file != undefined ? req.file.filename : "",
    });

    return res.json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ message: "Failed to create recipe" });
  }
};

const editRecipe = async (req, res) => {
  const {
    title,
    calories,
    mealTime,
    preparingTime,
    difficulty,
    instructions,
    userId,
    ingredients,
  } = req.body;

  try {
    Recipes.update(req.body, {where: {id: req.params.id}})

    return res.json(req.body);
  } catch (error) {
    console.error("Error editing recipe:", error);
    return res.status(500).json({ message: "Failed to edit recipe" });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params; 

  if (!id) {
    return res.status(400).json({ message: "Recipe ID is required" });
  }

  try {
    const deletedCount = await Recipes.destroy({
      where: { id }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ status: "ok", message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Error deleting recipe:", err);
    return res.status(500).json({ message: "Error deleting recipe" });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
};
