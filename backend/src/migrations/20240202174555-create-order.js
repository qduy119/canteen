"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Order", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: Sequelize.STRING,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            orderDate: Sequelize.DATE,
            total: Sequelize.FLOAT,
            seatNumber: Sequelize.INTEGER,
            status: {
                type: Sequelize.TEXT,
                defaultValue: "Pending",
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Order");
    },
};
