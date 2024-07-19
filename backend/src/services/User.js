const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { User } = require("../models");
const { sendRefreshToken, genAccessToken } = require("../utils/token");
const { validateToken, removeToken } = require("../utils/redisHelper");

class UserService {
    async getAll() {
        const data = await User.findAll();
        return data;
    }
    async getById(id) {
        const data = await User.findByPk(id);
        delete data.get().password;
        return data;
    }
    async update(id, payload) {
        await User.update(payload, { where: { id } });
    }
    async delete(id) {
        await User.destroy({ where: { id } });
    }
    async authenticate(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json("User not found");
        }
        if (!(await user.correctPassword(password))) {
            return res.status(409).json("Email or password is incorrect");
        }
        delete user.password;
        await sendRefreshToken(user, res);
        const accessToken = genAccessToken(user);
        res.status(200).json({ accessToken });
    }
    async register(req, res) {
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
    }
    logout(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new Error("You are not logged in");
        }
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (error, user) => {
                if (error) {
                    throw new Error(error);
                }
                const isDel = await removeToken(user.id, refreshToken);
                if (!isDel) {
                    throw new Error("Refresh token is not found");
                }
                const options = {
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                };
                res.clearCookie("refreshToken", options);
                res.status(200).json({});
            }
        );
    }
    refresh(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new Error("You are not logged in");
        }
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (error, user) => {
                if (error) {
                    throw new Error(error);
                }
                const isFound = await validateToken(user.id, refreshToken);
                if (!isFound) {
                    throw new Error("Refresh token is not found");
                }
                const newAccessToken = genAccessToken(user);
                res.status(200).json({ token: newAccessToken });
            }
        );
    }
    async handleThirdPartyAuthentication(error, user, info, req, res, next) {
        if (error) {
            return next(error);
        }
        if (!user) {
            const { message } = info;
            return res.status(401).json({ message });
        }
        delete user.get().password;
        const token = genAccessToken(user);
        await sendRefreshToken(user, res);

        res.redirect(
            `${process.env.CLIENT_DOMAIN}/oauth-success?token=${token}&id=${user.id}`
        );
    }
}

module.exports = UserService;
