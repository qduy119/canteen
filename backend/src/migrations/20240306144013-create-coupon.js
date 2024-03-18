"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Coupon", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            code: {
                type: Sequelize.TEXT,
            },
            title: Sequelize.TEXT,
            discountPercentage: {
                type: Sequelize.FLOAT,
                validate: {
                    min: 0,
                },
            },
            expirationDate: Sequelize.DATE,
            usedQuantity: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            usageLimit: {
                type: Sequelize.INTEGER,
                defaultValue: 10,
                validate: {
                    min: 0,
                },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Coupon");
    },
};
