"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Item", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            categoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "category",
                    key: "id",
                },
            },
            thumbnail: Sequelize.TEXT,
            name: Sequelize.TEXT,
            description: Sequelize.TEXT,
            price: Sequelize.FLOAT,
            discount: Sequelize.FLOAT,
            stock: Sequelize.INTEGER,
            images: Sequelize.JSON,
            rating: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
                validate: {
                    max: 5,
                },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Item");
    },
};
