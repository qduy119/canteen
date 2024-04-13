const { Op } = require("sequelize");
const { Item, Review, OrderItem, User, sequelize } = require("../models");
const NodeMailer = require("../utils/mail");

module.exports = class ItemController {
    static async getAll(req, res) {
        try {
            const { page, per_page, keyword, categoryId } = req.query;
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
                return res.status(200).json({ data, total_pages });
            } else if (keyword) {
                const data = await Item.findAll({
                    where: {
                        name: {
                            [Op.like]: `%${keyword}%`,
                        },
                    },
                    include: "category",
                });
                return res.status(200).json({ data });
            }
            const data = await Item.findAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
    static async getTopSales(req, res) {
        try {
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
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
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
            res.status(200).json({ data, review });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async create(req, res) {
        try {
            const { isSendNotification, ...payload } = req.body;
            const item = await Item.create(payload);
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
                const mailService = new NodeMailer(emails);
                await mailService.send("💥 MYCANTEEN: NEW FOOD 🥪", item);
            }
            res.status(200).json({});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const payload = req.body;
            await Item.update(payload, { where: { id } });
            res.status(200).json({});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            await Item.destroy({ where: { id } });
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
};
