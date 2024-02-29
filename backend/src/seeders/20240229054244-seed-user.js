"use strict";
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const salt = await bcrypt.genSalt(16);
        const password = await bcrypt.hash("admin", salt);
        await queryInterface.bulkInsert("User", [
            {
                id: uuid(),
                email: "admin@admin.com",
                password,
                avatar: "https://res.cloudinary.com/dlzyiprib/image/upload/v1694617729/e-commerces/user/kumz90hy8ufomdgof8ik.jpg",
                role: "Admin",
                provider: "default",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("User", null, {});
    },
};
