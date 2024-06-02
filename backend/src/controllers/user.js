const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { User } = require("../models");

const genAccessToken = (user) =>
    jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });

const genRefreshToken = (user) =>
    jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });

function sendRefreshToken(user, res) {
    const refreshToken = genRefreshToken(user);
    const options = {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // for 90 days
    };
    res.cookie("refreshToken", refreshToken, options);
}

module.exports = class UserController {
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const data = await User.findByPk(id);
            delete data.get().password;
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async getAll(req, res) {
        try {
            const data = await User.findAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const payload = req.body;
            await User.update(payload, { where: { id } });
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            await User.destroy({ where: { id } });
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async authenticate(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json("User not found");
            }
            if (!(await user.correctPassword(password))) {
                return res.status(409).json("Email or password is incorrect");
            }
            delete user.password;
            sendRefreshToken(user, res);
            req.user = user;
            const accessToken = genAccessToken(user);
            res.status(200).json({ user, accessToken });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
    static async register(req, res) {
        try {
            const id = uuid();
            const payload = req.body;
            const user = await User.findOne({
                where: { email: payload.email },
            });
            if (user) {
                return res.status(409).json("User already exists");
            }
            await User.create({ ...payload, id });
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async logout(req, res) {
        const options = {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        };
        res.clearCookie("refreshToken", options);
        res.status(200).json({});
    }
    static async refresh(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return next(new Error("You are not logged in"));
        }
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (error, user) => {
                if (error) {
                    return next(error);
                }
                const newAccessToken = genAccessToken(user);
                sendRefreshToken(user, res);
                res.status(200).json({ token: newAccessToken });
            }
        );
    }
    static handleThirdPartyAuthentication(req, res, next) {
        return (error, user, info) => {
            try {
                if (error) {
                    return next(error);
                }
                if (!user) {
                    const { message } = info;
                    return res.status(401).json({ message });
                }
                delete user.get().password;
                const token = genAccessToken(user);
                sendRefreshToken(user, res);
                req.user = user;

                res.redirect(
                    `${process.env.CLIENT_DOMAIN}/oauth-success?token=${token}&id=${user.id}`
                );
            } catch (error) {
                next(error);
            }
        };
    }
};
