"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            OrderItem.belongsTo(models.Order, {
                foreignKey: "orderId",
                targetKey: "id",
            });
            OrderItem.belongsTo(models.Item, {
                foreignKey: "itemId",
                targetKey: "id",
                as: "item",
            });
            OrderItem.hasMany(models.Review, {
                foreignKey: "orderItemId",
            });
        }
    }
    OrderItem.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            itemId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "item",
                    key: "id",
                },
            },
            orderId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "order",
                    key: "id",
                },
            },
            quantity: DataTypes.INTEGER,
            price: DataTypes.FLOAT,
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "OrderItem",
            timestamps: false,
        }
    );
    return OrderItem;
};
