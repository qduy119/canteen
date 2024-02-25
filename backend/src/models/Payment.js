"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Payment.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
            });
            Payment.belongsTo(models.Order, {
                foreignKey: "orderId",
                targetKey: "id",
            });
        }
    }
    Payment.init(
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
            orderId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "order",
                    key: "id",
                },
            },
            payDate: DataTypes.DATE,
            bankCode: DataTypes.TEXT,
            cardType: DataTypes.TEXT,
            amount: DataTypes.FLOAT,
            status: {
                type: DataTypes.TEXT,
                defaultValue: "Pending",
            },
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "Payment",
            timestamps: false,
        }
    );
    return Payment;
};
