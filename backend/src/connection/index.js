const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
    } catch (err) {
        console.log("Unable to connect to database: " + err);
    }
}

module.exports = connect;
