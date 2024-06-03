const { OrderItem, Review } = require("../models");

class OrderItemService {
    async isRated(id) {
        const data = await Review.findOne({ where: { orderItemId: id } });
        return { isRated: Boolean(data) };
    }
    async create(payload) {
        await OrderItem.create(payload);
    }
}

module.exports = OrderItemService;
