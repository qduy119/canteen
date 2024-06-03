const CouponService = require("../services/Coupon");

class CouponController {
    constructor() {
        this._couponService = new CouponService();
    }

    getAll = async (req, res) => {
        try {
            const data = await this._couponService.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this._couponService.getById(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    create = async (req, res) => {
        try {
            const payload = req.body;
            await this._couponService.create(payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            await this._couponService.update(id, payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            await this._couponService.delete(id);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = new CouponController();
