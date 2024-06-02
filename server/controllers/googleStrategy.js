require("dotenv").config();
const User = require("../models/User")
const AUTH_TYPE = require("../utils/authTypes")
const createUsername = require("../utils/createUsername");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleStrategy = new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async(_, _2, profile, done) => {
      const existingUser = await User.findOne({ authId: profile.id, authType: AUTH_TYPE.GOOGLE });
      console.log(profile.id)
      if (existingUser) {
        return done(null, existingUser);
      } else if(profile){
        const user = new User({
            first_name: profile.name.givenName,
            last_name: profile.name.familyName || profile.name.givenName,
            email: profile.emails[0].value,
            username: createUsername(profile.emails[0].value),
            authType: AUTH_TYPE.GOOGLE,
            authId: profile.id,
            imagePath: profile.photos[0].value,
        })
        await user.save();
        return done(null, user)
      }
      else{
        return done(null, false)
      }
    }
  )

  module.exports = googleStrategy;