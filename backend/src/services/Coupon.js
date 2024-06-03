const { Coupon } = require("../models");

class CouponService {
    async getAll() {
        const data = await Coupon.findAll();
        return data;
    }
    async getById(id) {
        const data = await Coupon.findByPk(id);
        return data;
    }
    async create(payload) {
        await Coupon.create(payload);
    }
    async update(id, payload) {
        await Coupon.update(payload, { where: { id } });
    }
    async delete(id) {
        await Coupon.destroy({ where: { id } });
    }
}

module.exports = CouponService;
