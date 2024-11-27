'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      }
    });

    await queryInterface.createTable("CookTips", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.createTable("Ingredients", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }
    });

    await queryInterface.createTable("Recipes", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      calories: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      mealTime: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      preparingTime: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      difficulty: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      instructions: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.createTable("Reviews", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.createTable("RecipeIngredients", {
      ingredientId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      recipeId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Recipes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.createTable("FavoriteRecipes", {
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      recipeId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Recipes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // await queryInterface.addConstraint('CookTips', {
    //   fields: ['userId'],
    //   type: 'foreign key',
    //   name: 'fk_cooktips_user',
    //   references: {
    //     table: 'Users',
    //     field: 'id'
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE'
    // });

    // await queryInterface.addConstraint('Reviews', {
    //   fields: ['userId'],
    //   type: 'foreign key',
    //   name: 'fk_reviews_user',
    //   references: {
    //     table: 'Users',
    //     field: 'id'
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE'
    // });

    // await queryInterface.addConstraint('Recipes', {
    //   fields: ['userId'],
    //   type: 'foreign key',
    //   name: 'fk_recipes_user',
    //   references: {
    //     table: 'Users',
    //     field: 'id'
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE'
    // });

    await queryInterface.addConstraint('RecipeIngredients', {
      fields: ['ingredientId', 'recipeId'],
      type: 'primary key',
      name: 'recipeingredients_pk'
    });

    await queryInterface.addConstraint('FavoriteRecipes', {
      fields: ['userId', 'recipeId'],
      type: 'primary key',
      name: 'favoriterecipes_pk'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('CookTips');
    await queryInterface.dropTable('RecipeIngredients');
    await queryInterface.dropTable('FavoriteRecipes');
    await queryInterface.dropTable('Recipes');
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Reviews');
    await queryInterface.dropTable('Ingredients');
  }
};
