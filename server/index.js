require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./routes/authRoutes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const User = require("./models/User");

const session = require("express-session");
const googleStrategy = require("./controllers/googleStrategy");
const facebookStrategy = require("./controllers/facebookStrategy")
mongoose.connect(process.env.URL, {
  dbName: process.env.DB_NAME,
});
app.use(session({
  secret: process.env.SESSION_SECRET,
}))
app.use(passport.initialize());
app.use(passport.session())
passport.use(googleStrategy);
passport.use(facebookStrategy)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`server working on http://127.0.0.1:${process.env.PORT}`);
});
