const { OrderItem, Review } = require("../models");

module.exports = class ItemController {
    static async isRated(req, res) {
        const { id } = req.params;
        const data = await Review.findOne({ where: { orderItemId: id } });
        res.status(200).json({ isRated: Boolean(data) });
    }
    static async create(req, res) {
        try {
            const payload = req.body;
            await OrderItem.create(payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
};
