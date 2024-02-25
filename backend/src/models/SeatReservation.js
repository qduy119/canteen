"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SeatReservation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            SeatReservation.belongsTo(models.Order, {
                foreignKey: "orderId",
                targetKey: "id",
            });
        }
    }
    SeatReservation.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            orderId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "order",
                    key: "id",
                },
            },
            seatNumber: {
                type: DataTypes.INTEGER,
                validate: {
                    max: 20,
                },
            },
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "SeatReservation",
            timestamps: false,
        }
    );
    return SeatReservation;
};
