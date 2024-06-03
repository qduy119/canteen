const { Op } = require("sequelize");
const { Order, OrderItem, Item, Coupon, sequelize } = require("../models");

class OrderService {
    async getAll(page, per_page, userId) {
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
            return { data, total_pages };
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
        return data;
    }
    async getById(id) {
        const data = await Order.findByPk(id);
        return data;
    }
    async create(payload) {
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
        return data;
    }
    async update(id, payload) {
        await Order.update(payload, { where: { id } });
    }
    async cancelOrder(id) {
        await Order.update({ status: "Cancel" }, { where: { id } });
        const order = await Order.findOne({
            where: {
                id,
            },
            include: "orderItems",
        });
        if (order.couponCode) {
            await Coupon.increment(
                { usedQuantity: -1 },
                { where: { code: order.couponCode } }
            );
        }
        for (const orderItem of order.orderItems) {
            await Item.increment(
                { stock: orderItem.quantity },
                { where: { id: orderItem.itemId } }
            );
        }
    }
}

module.exports = OrderService;
