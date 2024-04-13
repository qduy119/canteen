"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Item.hasMany(models.CartItem, {
                foreignKey: "itemId",
            });
            Item.hasMany(models.OrderItem, {
                foreignKey: "itemId",
                as: "items",
            });
            Item.belongsTo(models.Category, {
                foreignKey: "categoryId",
                targetKey: "id",
                as: "category",
            });
        }
    }
    Item.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            categoryId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "category",
                    key: "id",
                },
            },
            thumbnail: DataTypes.TEXT,
            name: DataTypes.TEXT,
            description: DataTypes.TEXT,
            price: DataTypes.FLOAT,
            discount: DataTypes.FLOAT,
            stock: DataTypes.INTEGER,
            images: DataTypes.JSON,
            rating: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
                validate: {
                    max: 5,
                },
            },
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "Item",
            timestamps: false,
        }
    );
    return Item;
};
