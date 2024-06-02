require("dotenv").config();
const FacebookStrategy = require("passport-facebook").Strategy
const facebookStrategy = new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: process.env.FB_CALLBACK_URL
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    // return done(null, profile);
})
module.exports = facebookStrategy;