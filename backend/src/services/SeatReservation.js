const { SeatReservation } = require("../models");

class SeatReservationService {
    async getAll() {
        const data = await SeatReservation.findAll();
        return data;
    }
    async create(payload) {
        await SeatReservation.create(payload);
    }
    async delete(seatNumber) {
        await SeatReservation.destroy({ where: { seatNumber } });
    }
}

module.exports = SeatReservationService;
