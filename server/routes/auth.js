const dotenv = require("dotenv");
const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const path = require("path");

dotenv.config();

const PORT = 8080;
const URI = `http://localhost:${PORT}`
const REDIRECT_URI = `http://localhost:${PORT}/auth/callback`
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const scope = "user-read-recently-played user-top-read";

const router = express.Router();

router.get("/login", (req, res) => {
    console.log(CLIENT_ID);
    console.log(REDIRECT_URI);
    res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        scope: scope,
    })}`);
});

router.get("/callback", async (req, res) => {
    const {code} = req.query;

    const {data} = await axios.post(
        "https://accounts.spotify.com/api/token",
        querystring.stringify({
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: REDIRECT_URI,
        }),
        {
            headers: {
                Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    console.log(data);

    const sessionJWTObject = {
        token: data.access_token,
    };

    req.session.jwt = jwt.sign(sessionJWTObject, JWT_SECRET_KEY);
    return res.redirect('http://localhost:3000');
});

router.get("/current-session", (req, res) => {
    jwt.verify(req.session.jwt, JWT_SECRET_KEY, (err, decodedToken) => {
        if (err || !decodedToken) {
            res.send(false);
        } else {
            res.send(decodedToken);
        }
    });
});

router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect('/');
});

module.exports = router;