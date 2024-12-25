const { Sequelize, DataTypes } = require("sequelize");

// Подключение к базе данных
const sequelize = new Sequelize("recipesdb", "postgres", "helloworld0905", {
  host: "localhost",
  port: 5123,
  dialect: "postgres",
});

const Recipes = sequelize.define(
  "Recipes",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mealTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preparingTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "UserId",
    },
  },
  {
    timestamps: false,
  }
);

const Ingredients = sequelize.define("Ingredients", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const CookTips = sequelize.define(
  "CookTips",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false,
  }
);

const Reviews = sequelize.define(
  "Reviews",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const RecipeIngredients = sequelize.define("RecipeIngredients", {
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ingredientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const FavoriteRecipes = sequelize.define("FavoriteRecipes", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Описание отношений между моделями
Users.hasOne(Reviews, { foreignKey: "userId" });
Reviews.belongsTo(Users, { foreignKey: "userId" });

Users.hasMany(CookTips, { foreignKey: "userId" });
CookTips.belongsTo(Users, { foreignKey: "userId" });

Users.hasMany(Recipes);
Recipes.belongsTo(Users);

// Recipes.belongsToMany(Ingredients, { through: RecipeIngredients });
// Ingredients.belongsToMany(Recipes, { through: RecipeIngredients });

Users.belongsToMany(Recipes, { through: FavoriteRecipes });
Recipes.belongsToMany(Users, { through: FavoriteRecipes });

module.exports = {
  Recipes,
  Ingredients,
  Reviews,
  CookTips,
  Users,
  FavoriteRecipes,
  RecipeIngredients,
  sequelize,
};
