const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { User } = require("../models");
const { sendRefreshToken, genAccessToken } = require("../utils/token");

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
        sendRefreshToken(user, res);
        req.user = user;
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
    logout(res) {
        const options = {
            sameSite: "none",
            secure: true,
            httpOnly: true,
        };
        res.clearCookie("refreshToken", options);
        res.status(200).json({});
    }
    refresh(req, res) {
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
    handleThirdPartyAuthentication(error, user, info, req, res, next) {
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
    }
}

module.exports = UserService;
