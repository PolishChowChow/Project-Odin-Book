require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const threadRouter = require("./routes/threadRoutes");
const requestStatusRouter = require("./routes/requestStatusRoutes");
const googleStrategy = require("./controllers/googleStrategy");
const facebookStrategy = require("./controllers/facebookStrategy");
const User = require("./models/User");
const { authorize } = require("./controllers/authController");
const ObjectId = mongoose.Types.ObjectId;
mongoose.set("strictPopulate", false);
mongoose.connect(process.env.URL, {
  dbName: process.env.DB_NAME,
});

const db = mongoose.connect;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
      mongoUrl: process.env.URL,
      collection: "sessions",
      ttl: 14 * 24 * 60 * 60,
    }),

    cookie: {
      maxAge: 1000 * 3600 * 2,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(googleStrategy);
passport.use(facebookStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  if (ObjectId.isValid(id)){
    const user = await User.findById(id);
    done(null, user);
  }
  done(null, null)
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
app.use("/auth", authRouter);
app.use(authorize);
app.use("/threads", threadRouter);
app.use("/requestStatus", requestStatusRouter);
app.get("/store", (req, res, next) => {
  res.send("hi there");
});

app.listen(process.env.PORT, () => {
  console.log(`server working on http://127.0.0.1:${process.env.PORT}`);
});
