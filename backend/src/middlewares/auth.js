const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protect = async (req, res, next) => {
    let token = "";
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        if (req.headers.authorization.split(" ")[1] === "null") {
            token = null;
        } else {
            token = req.headers.authorization.split(" ")[1];
        }
    }
    if (!token) {
        return next(new Error("You are not logged in"));
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, data) => {
        if (!data) {
            return res.status(401).json({});
        }
        if (error) {
            return next(error);
        }
        const freshUser = await User.findOne({
            where: {
                id: data.id,
            },
        });
        if (!freshUser) {
            return next(Error("User no longer exists"));
        }
        // Grant access to protected route
        delete freshUser.get().password;
        req.user = freshUser.get();
        next();
    });
};

const restrictTo =
    (...roles) =>
    (req, res, next) => {
        if (!roles.includes(req?.user.role)) {
            return res
                .status(403)
                .json("You are not allowed to do this action!");
        }
        next();
    };

module.exports = { protect, restrictTo };
