"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("CartItem", {
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
            itemId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "item",
                    key: "id",
                },
            },
            quantity: Sequelize.INTEGER,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("CartItem");
    },
};
