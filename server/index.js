require("dotenv").config()
const express  = require("express");
const app = express();
const authRouter = require("./routes/authRoutes")
const mongoose = require("mongoose")


mongoose.connect(process.env.URL, {

})
app.use(express.urlencoded({
    extended: true
}))

app.use("/auth", authRouter)

app.listen(process.env.PORT, () => {
    console.log(`server working on http://127.0.0.1:${process.env.PORT}`)
})