"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CartItem.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
            });
            CartItem.belongsTo(models.Item, {
                foreignKey: "itemId",
                targetKey: "id",
                as: "item",
            })
        }
    }
    CartItem.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.STRING,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            itemId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "item",
                    key: "id",
                },
            },
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "CartItem",
            timestamps: false,
        }
    );
    return CartItem;
};
