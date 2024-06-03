const PaymentService = require("../services/Payment");

class PaymentController {
    constructor() {
        this._paymentService = new PaymentService();
    }

    getAll = async (req, res) => {
        try {
            const { userId } = req.query;
            const data = await this._paymentService.getAll(userId);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    };
    create = async (req, res) => {
        try {
            const payload = req.body;
            const data = await this._paymentService.create(payload);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    };
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            await this._paymentService.update(id, payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    };
    createPaymentUrl = (req, res) => {
        try {
            const data = this._paymentService.createPaymentUrl(req);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    };
}

module.exports = new PaymentController();
