"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("OrderItem", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            itemId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "item",
                    key: "id",
                },
            },
            orderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "order",
                    key: "id",
                },
            },
            quantity: Sequelize.INTEGER,
            price: Sequelize.FLOAT,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("OrderItem");
    },
};
