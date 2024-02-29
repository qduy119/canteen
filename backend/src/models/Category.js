"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Category.hasMany(models.Item, {
                foreignKey: "categoryId",
                as: "products",
            });
            Category.hasMany(models.Item, {
                foreignKey: "categoryId",
            });
        }
    }
    Category.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            thumbnail: DataTypes.TEXT,
            name: DataTypes.TEXT,
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "Category",
            timestamps: false,
        }
    );
    return Category;
};
