const SeatReservationService = require("../services/SeatReservation");

class SeatReservationController {
    constructor() {
        this._seatReservationService = new SeatReservationService();
    }

    getAll = async (req, res) => {
        try {
            const data = await this._seatReservationService.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    create = async (req, res) => {
        try {
            const payload = req.body;
            await this._seatReservationService.create(payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    delete = async (req, res) => {
        try {
            const { seatNumber } = req.query;
            await this._seatReservationService.delete(seatNumber);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = new SeatReservationController();
