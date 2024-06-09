require("dotenv").config();
const User = require("../models/User");
const Auth = require("../models/Auth");
const AUTH_TYPE = require("../utils/authTypes");
const createUsername = require("../utils/createUsername");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (_, _2, profile, done) => {
    if (!profile) {
      return done(null, false);
    }
    const existingAuth = await Auth.findOne({
      authId: profile.id,
      authType: AUTH_TYPE.GOOGLE,
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
      email: profile.emails[0].value,
    });
    const newAuth = new Auth({
      authId: profile.id,
      authType: AUTH_TYPE.GOOGLE,
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
      first_name: profile.name.givenName,
      last_name: profile.name.familyName || profile.name.givenName,
      email: profile.emails[0].value,
      username: createUsername(profile.emails[0].value),
      authMethods: [
        newAuth
      ],
      imagePath: profile.photos[0].value,
    });
    await user.save();
    return done(null, user);
  }
);

module.exports = googleStrategy;
