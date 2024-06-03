const { CartItem, Item } = require("../models");

class CartItemService {
    async getAll(userId) {
        const data = await CartItem.findAll({
            where: {
                userId,
            },
            include: "item",
        });
        return data;
    }
    async create(payload) {
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
        await Item.increment({ stock: -quantity }, { where: { id: itemId } });
        return data;
    }
    async update(id, payload) {
        const cartItem = await CartItem.findByPk(id);
        const diff = payload.quantity - cartItem.quantity;
        await Item.increment(
            { stock: -diff },
            { where: { id: cartItem.itemId } }
        );
        await CartItem.update(payload, { where: { id } });
    }
    async delete(id) {
        const cartItem = await CartItem.findByPk(id);
        await Item.increment(
            { stock: cartItem.quantity },
            { where: { id: cartItem.itemId } }
        );
        await CartItem.destroy({ where: { id } });
    }
}

module.exports = CartItemService;
