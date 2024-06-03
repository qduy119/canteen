const CartItemService = require("../services/CartItem");

class CartItemController {
    constructor() {
        this._cartItemService = new CartItemService();
    }

    getAll = async (req, res) => {
        try {
            const { userId } = req.query;
            const data = await this._cartItemService.getAll(userId);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    create = async (req, res) => {
        try {
            const payload = req.body;
            const data = await this._cartItemService.create(payload);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            await this._cartItemService.update(id, payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            await this._cartItemService.delete(id);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = new CartItemController();
