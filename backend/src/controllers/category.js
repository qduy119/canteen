const CategoryService = require("../services/Category");

class CategoryController {
    constructor() {
        this._categoryService = new CategoryService();
    }
    getAll = async (req, res) => {
        try {
            const data = await this._categoryService.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this._categoryService.getById(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    create = async (req, res) => {
        try {
            const payload = req.body;
            await this._categoryService.create(payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            await this._categoryService.update(id, payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            await this._categoryService.delete(id);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = new CategoryController();
