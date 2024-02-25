const { Review, OrderItem, Item } = require("../models");

module.exports = class ReviewController {
    static async create(req, res) {
        try {
            const payload = req.body;
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
            res.status(200).json({});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
};
