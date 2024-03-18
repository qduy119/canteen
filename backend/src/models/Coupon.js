"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Coupon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Coupon.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            code: {
                type: DataTypes.TEXT,
            },
            title: DataTypes.TEXT,
            discountPercentage: {
                type: DataTypes.FLOAT,
                validate: {
                    min: 0,
                },
            },
            expirationDate: DataTypes.DATE,
            usedQuantity: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            usageLimit: {
                type: DataTypes.INTEGER,
                defaultValue: 10,
                validate: {
                    min: 0,
                },
            },
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "Coupon",
            timestamps: false,
        }
    );
    return Coupon;
};
