const ItemService = require("../services/Item");

class ItemController {
    constructor() {
        this._itemService = new ItemService();
    }

    getAll = async (req, res) => {
        try {
            const { page, per_page, keyword, categoryId } = req.query;
            const data = await this._itemService.getAll(
                page,
                per_page,
                keyword,
                categoryId
            );
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    getTopSales = async (req, res) => {
        try {
            const data = await this._itemService.getTopSales();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this._itemService.getById(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    create = async (req, res) => {
        try {
            const payload = req.body;
            await this._itemService.create(payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            await this._itemService.update(id, payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            await this._itemService.delete(id);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = new ItemController();
