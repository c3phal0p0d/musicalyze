const PORT = 3000;

const express = require("express");
const app = express();

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Musicalyze");
})