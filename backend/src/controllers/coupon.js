const { Op } = require("sequelize");
const { Coupon, model, sequelize } = require("../models");

module.exports = class CouponController {
    static async getAll(req, res) {
        try {
            const data = await Coupon.findAll({
                where: {
                    expirationDate: {
                        [Op.gt]: new Date(),
                    },
                    usedQuantity: {
                        [Op.lt]: sequelize.col("usageLimit"),
                    },
                },
            });
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const data = await Coupon.findByPk(id);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
    static async create(req, res) {
        try {
            const payload = req.body;
            await Coupon.create(payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const payload = req.body;
            await Coupon.update(payload, { where: { id } });
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            await Coupon.destroy({ where: { id } });
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
};
