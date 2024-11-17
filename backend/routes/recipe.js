const express = require("express");
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe } = require("../controller/recipe");
const router = express.Router();

router.get("/", getRecipes); // get all recipes
router.get("/:id", getRecipe); // get recipe by id
router.post("/", addRecipe); // add recipe
router.put("/:id", editRecipe); // edit recipe by id
router.delete("/:id", deleteRecipe); // delete recipe by id

module.exports = router;
