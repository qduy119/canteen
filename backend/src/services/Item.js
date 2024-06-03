const { Op } = require("sequelize");
const { Item, Review, OrderItem, User, sequelize } = require("../models");
const NodeMailerService = require("./NodeMailer");

class ItemService {
    async getAll(page, per_page, keyword, categoryId) {
        if (page && per_page) {
            const condition = {};
            if (keyword) {
                condition.name = {
                    [Op.like]: `%${keyword}%`,
                };
            }
            if (categoryId) {
                condition.categoryId = {
                    [Op.eq]: categoryId,
                };
            }
            const { rows: data, count } = await Item.findAndCountAll({
                where: {
                    ...condition,
                },
                include: "category",
                offset: (+page - 1) * +per_page,
                limit: +per_page,
            });
            const total_pages = Math.ceil(count / +per_page);
            return { data, total_pages };
        } else if (keyword) {
            const data = await Item.findAll({
                where: {
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
                include: "category",
            });
            return { data };
        }
        const data = await Item.findAll();
        return data;
    }
    async getTopSales() {
        const data = await Item.findAll({
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
                            SELECT COUNT (*)
                            FROM OrderItem AS orderitem 
                            JOIN \`Order\` AS \`order\` 
                            ON orderitem.orderId = \`order\`.id
                            WHERE \`order\`.status = "Success" AND orderitem.itemId = item.id
                        )`),
                        "soldQuantity",
                    ],
                ],
            },
            having: sequelize.literal("soldQuantity > 0"),
            order: [[sequelize.literal("soldQuantity"), "DESC"]],
            limit: 5,
        });
        return data;
    }
    async getById(id) {
        const data = await Item.findByPk(id);
        const review = await Review.findAll({
            include: [
                {
                    model: OrderItem,
                    where: {
                        itemId: id,
                    },
                },
                {
                    model: User,
                    as: "user",
                },
            ],
            order: [["createAt", "DESC"]],
        });
        return { data, review };
    }
    async create(payload) {
        const { isSendNotification, ...rest } = payload;
        const item = await Item.create(rest);
        if (isSendNotification) {
            let emails = await User.findAll({
                where: {
                    role: {
                        [Op.ne]: "Admin",
                    },
                },
                attributes: ["email"],
            });
            emails = emails.map((item) => item.email).join(", ");
            const mailService = new NodeMailerService(emails);
            await mailService.send("💥 MYCANTEEN: NEW FOOD 🥪", item);
        }
    }
    async update(id, payload) {
        await Item.update(payload, { where: { id } });
    }
    async delete(id) {
        await Item.destroy({ where: { id } });
    }
}

module.exports = ItemService;
