require("dotenv").config();
const User = require("../models/User");
const AUTH_TYPE = require("../utils/authTypes");
const Auth = require("../models/Auth");
const FacebookStrategy = require("passport-facebook").Strategy;
const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: process.env.FB_CALLBACK_URL,
  },
  async (_, _2, profile, done) => {
    const [firstName, lastName] = profile.displayName.split(" ");
    const username = `${firstName}.${lastName}`;
    const email = `${username}@gmail.com`;
    console.log(profile);
    // return done(null, profile)
    if (!profile) {
      return done(null, false);
    }
    const existingAuth = await Auth.findOne({
      authId: profile.id,
      authType: AUTH_TYPE.FACEBOOK,
    });

    if (existingAuth) {
      console.log(existingAuth);
      const userWithTheSameAuth = await User.findOne({
        authMethods: {
          $in: existingAuth.id,
        },
      });
      return done(null, userWithTheSameAuth);
    }
    const existingUserWithSameEmail = await User.findOne({
      email,
    });
    const newAuth = new Auth({
      authId: profile.id,
      authType: AUTH_TYPE.FACEBOOK,
    });
    await newAuth.save();
    if (existingUserWithSameEmail) {
      await User.findOneAndUpdate(
        { email: profile.emails[0].value },
        {
          $push: { authMethods: newAuth },
        }
      );
      return done(null, existingUserWithSameEmail);
    }
    const user = new User({
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      authMethods: [newAuth],
    });
    await user.save();
    return done(null, user);
  }
);
module.exports = facebookStrategy;
