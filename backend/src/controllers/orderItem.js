const OrderItemService = require("../services/OrderItem");

class OrderItemController {
    constructor() {
        this._orderItemService = new OrderItemService();
    }

    isRated = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this._orderItemService.isRated(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    create = async (req, res) => {
        try {
            const payload = req.body;
            await this._orderItemService.create(payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = new OrderItemController();
