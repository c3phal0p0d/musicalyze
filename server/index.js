require("dotenv").config();

const PORT = 3000;
const URI = `http://localhost:${PORT}`
const REDIRECT_URI = `http://localhost:${PORT}/account`
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const scope = "user-read-recently-played user-top-read"

const express = require("express");
const querystring = require("querystring");
const axios = require("axios");

const app = express();

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send(
        `<a href="https://accounts.spotify.com/authorize?${querystring.stringify({
            client_id: CLIENT_ID,
            response_type: 'code',
            redirect_uri: REDIRECT_URI,
            scope: scope,
        })}">Sign in</a>`
    );
});

app.get("/account", async (req, res) => {
    const authResponse = await axios.post(
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
    console.log(authResponse.data);
    const data = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?limit=50",
        {
            headers: {
                Authorization: "Bearer " + authResponse.data.access_token,
            },
        }
    );
    console.log(data);
});