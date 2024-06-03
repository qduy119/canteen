const { Review, OrderItem, Item } = require("../models");

class ReviewService {
    async create(payload) {
        const { rating: reviewRating, orderItemId } = payload;
        await Review.create(payload);
        const { itemId } = await OrderItem.findOne({
            where: { id: orderItemId },
        });
        const { rating } = await Item.findOne({ where: { id: itemId } });
        const n = await Review.count({
            include: [
                {
                    model: OrderItem,
                    where: {
                        itemId,
                    },
                },
            ],
        });
        await Item.update(
            { rating: (((n - 1) * rating + reviewRating) / n).toFixed(2) },
            { where: { id: itemId } }
        );
    }
}

module.exports = ReviewService;
