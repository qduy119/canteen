"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.hasMany(models.OrderItem, {
                foreignKey: "orderId",
                as: "orderItems",
            });
            Order.hasOne(models.Payment, {
                foreignKey: "orderId",
                as: "payment",
            });
            Order.hasOne(models.SeatReservation, {
                foreignKey: "orderId",
            });
            Order.belongsTo(models.User, {
                foreignKey: "userId",
            });
        }
    }
    Order.init(
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
            orderDate: DataTypes.DATE,
            total: DataTypes.FLOAT,
            seatNumber: DataTypes.INTEGER,
            status: {
                type: DataTypes.TEXT,
                defaultValue: "Pending",
            },
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "Order",
            timestamps: false,
        }
    );
    return Order;
};
