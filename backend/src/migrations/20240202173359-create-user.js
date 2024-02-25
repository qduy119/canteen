"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("User", {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            email: Sequelize.TEXT,
            password: Sequelize.TEXT,
            provider: {
                type: Sequelize.TEXT,
                defaultValue: "default",
            },
            phoneNumber: Sequelize.TEXT,
            fullName: Sequelize.TEXT,
            avatar: {
                type: Sequelize.TEXT,
                defaultValue:
                    "https://res.cloudinary.com/dlzyiprib/image/upload/v1694617729/e-commerces/user/kumz90hy8ufomdgof8ik.jpg",
            },
            gender: Sequelize.TEXT,
            dateOfBirth: Sequelize.DATE,
            role: {
                type: Sequelize.TEXT,
                defaultValue: "Customer",
                validate: {
                    isIn: {
                        args: [["Customer", "Admin", "Employee"]],
                        msg: "Must be Customer, Employee or Admin",
                    },
                },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("User");
    },
};
