require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const https = require("https");
const fs = require("fs");
const connect = require("./src/connection");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./src/utils/passport")(app);

app.use("/", require("./src/routes/authRoute"));
app.use("/api", require("./src/routes/route"));

app.all("*", (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on server`);
    error.status = "Error";
    error.statusCode = 404;
    next(error);
});

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "Something went wrong";
    res.status(error.statusCode).json(error.message);
});

(async () => {
    await connect();
})();

const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

const server = https.createServer(options, app);

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
