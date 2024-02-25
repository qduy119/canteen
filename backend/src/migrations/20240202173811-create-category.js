"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Category", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            thumbnail: Sequelize.TEXT,
            name: Sequelize.TEXT,
            description: Sequelize.TEXT,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Category");
    },
};
