const jwt = require("jsonwebtoken");
const { setToken } = require("./redisHelper");

const genAccessToken = (user) =>
    jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });

const genRefreshToken = (user) =>
    jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });

async function sendRefreshToken(user, res) {
    const refreshToken = genRefreshToken(user);
    await setToken(user.id, refreshToken);
    const options = {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // for 90 days
    };
    res.cookie("refreshToken", refreshToken, options);
}

module.exports = { genAccessToken, genRefreshToken, sendRefreshToken };
