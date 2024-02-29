"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Category",
            [
                {
                    id: 1,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704429473/canteen/category/gnbm2iegikhu2uffvimm.png",
                    name: "Cơm",
                    description: "cơm ngon, giàu dinh dưỡng, sạch sẽ",
                },
                {
                    id: 2,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704429658/canteen/category/ppv5skfyhx9h2dqd8ow4.png",
                    name: "Trái cây",
                    description:
                        "Trái cây được nhập từ Phần lan, giàu dinh dưỡng, tươi, không thuốc trừ sâu, không chất độc hại",
                },
                {
                    id: 3,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704429835/canteen/category/xm4vfkscdnnx5vmusvcs.png",
                    name: "Hải Sản",
                    description:
                        "hải sản tươi ngon, từ biên Đông Việt nam, tươi, sạch, không chất bảo quản",
                },
                {
                    id: 4,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704430249/canteen/category/luauvxrjxaqfu0lb6eao.png",
                    name: "Chè Huế",
                    description: "mát lạnh, ngọt thanh đậm vị quê hương",
                },
                {
                    id: 5,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704430374/canteen/category/uqb3gtj0itklcvu1zlwb.png",
                    name: "Nước Giải Khát",
                    description: "mát lạnh, tiếp năng lượng dồi dào",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Category", null, {});
    },
};
