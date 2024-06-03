const { Category } = require("../models");

class CategoryService {
    async getAll() {
        const data = await Category.findAll();
        return data;
    }
    async getById(id) {
        const data = await Category.findByPk(id);
        return data;
    }
    async create(payload) {
        await Category.create(payload);
    }
    async update(id, payload) {
        await Category.update(payload, { where: { id } });
    }
    async delete(id) {
        await Category.destroy({ where: { id } });
    }
}

module.exports = CategoryService;
