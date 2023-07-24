const dotenv = require("dotenv");
const express = require("express");
const session = require("cookie-session");
const helmet = require("helmet");
const hpp = require("hpp");
const csurf = require("csurf");
const path = require("path");

dotenv.config({path: path.resolve(__dirname, '.env')});

const PORT = 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

/* Create app */
const app = express();

/* Set up security configs */
app.use(helmet());
app.use(hpp());

/* Set up cookie settings */
app.use(
    session({
        name: "session",
        keys: ["secret"],
        secret: COOKIE_SECRET,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
);
app.use(csurf());

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

module.exports = app;