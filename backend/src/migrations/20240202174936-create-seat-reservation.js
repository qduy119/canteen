"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("SeatReservation", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            orderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "order",
                    key: "id",
                },
            },
            seatNumber: {
                type: Sequelize.INTEGER,
                validate: {
                    max: 20,
                },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("SeatReservation");
    },
};
