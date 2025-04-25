const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findUserByGoogleId(profile.id);
        if (!user) {
          user = await UserModel.createUser(
            profile.id,
            profile.displayName,
            profile.emails[0].value,
            profile.photos[0].value
          );
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.google_id));
// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    // Fetch user details from the database using the serialized ID
    const user = await UserModel.findUserByGoogleId(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
