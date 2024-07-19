const { createClient } = require("redis");

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});

client.on("connect", () => {
    console.log("Redis connected");
});

client.on("error", (error) => {
    console.error(`Redis client error:`, error);
});

client.on("end", () => {
    console.log("Client disconnected from redis");
});

module.exports = client;
