const { SeatReservation } = require("../models");

module.exports = class ItemController {
    static async getAll(req, res) {
        try {
            const data = await SeatReservation.findAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async create(req, res) {
        try {
            const payload = req.body;
            await SeatReservation.create(payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async delete(req, res) {
        try {
            const { seatNumber } = req.query;
            await SeatReservation.destroy({ where: { seatNumber } });
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
};
