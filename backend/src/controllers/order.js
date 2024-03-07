const { Op } = require("sequelize");
const { Order, OrderItem, Item, Coupon, sequelize } = require("../models");

module.exports = class OrderController {
    static async getAll(req, res) {
        try {
            const { page, per_page, userId } = req.query;
            if (page && per_page && userId) {
                const { rows: data, count } = await Order.findAndCountAll({
                    where: {
                        userId,
                    },
                    offset: (+page - 1) * +per_page,
                    limit: +per_page,
                    order: [["orderDate", "DESC"]],
                    include: [
                        {
                            model: OrderItem,
                            as: "orderItems",
                            include: [{ model: Item, as: "item" }],
                        },
                    ],
                });
                const total_pages = Math.ceil(count / +per_page);
                return res.status(200).json({ data, total_pages });
            }
            const data = await Order.findAll({
                order: [["orderDate", "DESC"]],
                include: [
                    {
                        model: OrderItem,
                        as: "orderItems",
                        include: [{ model: Item, as: "item" }],
                    },
                ],
            });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const data = await Order.findByPk(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async create(req, res) {
        try {
            const payload = req.body;
            const { couponCode } = payload;
            if (couponCode) {
                await Coupon.increment(
                    { usedQuantity: 1 },
                    {
                        where: {
                            code: couponCode,
                            expirationDate: { [Op.gt]: new Date() },
                            usedQuantity: {
                                [Op.lt]: sequelize.col("usageLimit"),
                            },
                        },
                    }
                );
            }
            const data = await Order.create(payload);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const payload = req.body;
            await Order.update(payload, { where: { id } });
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async cancelOrder(req, res) {
        try {
            const { id } = req.params;
            await Order.update({ status: "Cancel" }, { where: { id } });
            const order = await Order.findOne({
                where: {
                    id,
                },
                include: "orderItems",
            });
            for (const orderItem of order.orderItems) {
                await Item.increment(
                    { stock: orderItem.quantity },
                    { where: { id: orderItem.itemId } }
                );
            }
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
};
