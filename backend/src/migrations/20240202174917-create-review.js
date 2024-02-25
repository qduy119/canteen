"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Review", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            orderItemId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "orderitem",
                    key: "id",
                },
            },
            userId: {
                type: Sequelize.STRING,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            rating: {
                type: Sequelize.INTEGER,
                validate: {
                    max: 5,
                },
            },
            description: Sequelize.TEXT,
            images: Sequelize.JSON,
            createAt: Sequelize.DATE,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Review");
    },
};
