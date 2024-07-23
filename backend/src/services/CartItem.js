const { CartItem, Item, sequelize } = require("../models");

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
        const t = await sequelize.transaction();

        try {
            const { userId, itemId, quantity } = payload;
            const item = await Item.findOne({
                where: { id: itemId },
                lock: true,
                transaction: t,
            });
            if (item.stock - quantity < 0) {
                throw new Error("Quantity invalid");
            }
            await Item.increment(
                { stock: -quantity },
                { where: { id: itemId }, transaction: t }
            );
            const isExist = await CartItem.findOne({
                where: { userId, itemId },
                transaction: t,
            });
            let data;
            if (isExist) {
                isExist.quantity += quantity;
                data = await isExist.save({ transaction: t });
            } else {
                data = await CartItem.create(payload, { transaction: t });
            }
            await t.commit();
            return data;
        } catch (error) {
            await t.rollback();
            throw error;
        }
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
