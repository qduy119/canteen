const { CartItem, Item } = require("../models");

module.exports = class CartItemController {
    static async getAll(req, res) {
        try {
            const { userId } = req.query;
            const data = await CartItem.findAll({
                where: {
                    userId,
                },
                include: "item",
            });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async create(req, res) {
        try {
            const payload = req.body;
            const { userId, itemId, quantity } = payload;
            const isExist = await CartItem.findOne({
                where: { userId, itemId },
            });
            let data;
            if (isExist) {
                isExist.quantity += quantity;
                data = await isExist.save();
            } else {
                data = await CartItem.create(payload);
            }
            await Item.increment(
                { stock: -quantity},
                { where: { id: itemId } }
            );
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const cartItem = await CartItem.findByPk(id);
            const payload = req.body;
            const diff = payload.quantity - cartItem.quantity;
            await Item.increment(
                { stock: -diff},
                { where: { id: cartItem.itemId } }
            );
            await CartItem.update(payload, { where: { id } });
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const cartItem = await CartItem.findByPk(id);
            await Item.increment(
                { stock: cartItem.quantity},
                { where: { id: cartItem.itemId } }
            );
            await CartItem.destroy({ where: { id } });
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
};
