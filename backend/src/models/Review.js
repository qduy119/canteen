"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Review.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
                as: "user",
            });
            Review.belongsTo(models.OrderItem, {
                foreignKey: "orderItemId",
                targetKey: "id",
            });
        }
    }
    Review.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            orderItemId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "orderitem",
                    key: "id",
                },
            },
            userId: {
                type: DataTypes.STRING,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            rating: {
                type: DataTypes.INTEGER,
                validate: {
                    max: 5,
                },
            },
            description: DataTypes.TEXT,
            images: DataTypes.JSON,
            createAt: DataTypes.DATE,
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "Review",
            timestamps: false,
        }
    );
    return Review;
};
