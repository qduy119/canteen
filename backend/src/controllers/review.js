const ReviewService = require("../services/Review");

class ReviewController {
    constructor() {
        this._reviewService = new ReviewService();
    }

    create = async (req, res) => {
        try {
            const payload = req.body;
            await this._reviewService.create(payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = new ReviewController();
