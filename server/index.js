require("dotenv").config()
const express  = require("express");
const app = express();

app.get("/", (req, res, next) => {
    res.send("siema")
})
app.listen(process.env.PORT, () => {
    console.log(`server working on http://127.0.0.1:${process.env.PORT}`)
})