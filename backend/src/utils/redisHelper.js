const redis = require("./redis");

async function setToken(id, token) {
    const key = `user:${id}:${token}`;
    await redis.set(key, token, { EX: process.env.REDIS_TOKEN_EXPIRATION });
}

async function validateToken(id, token) {
    const key = `user:${id}:${token}`;
    const isFound = await redis.get(key);
    return isFound !== null;
}

async function removeToken(id, token) {
    const key = `user:${id}:${token}`;
    const reply = await redis.del(key);
    return reply !== 0;
}

module.exports = { setToken, validateToken, removeToken };
