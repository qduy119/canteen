const OrderService = require("../services/Order");

class OrderController {
    constructor() {
        this._orderService = new OrderService();
    }

    getAll = async (req, res) => {
        try {
            const { page, per_page, userId } = req.query;
            const data = await this._orderService.getAll(
                page,
                per_page,
                userId
            );
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this._orderService.getById(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    create = async (req, res) => {
        try {
            const payload = req.body;
            const data = await this._orderService.create(payload);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            await this._orderService.update(id, payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    cancelOrder = async (req, res) => {
        try {
            const { id } = req.params;
            await this._orderService.cancelOrder(id);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = new OrderController();
