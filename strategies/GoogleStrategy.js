import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../models/userModel.js';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: '/auth/google/callback',
    },
    ((_, __, profile, email, cb) => {
      const userEmail = email.emails[0].value;

      const Avatar = email.photos[0].value;
      User.findOne({ googleId: email.id }, async (err, doc) => {
        if (err) {
          return cb(err, null);
        }
        if (!doc) {
          const newUser = new User({
            googleId: email.id,
            firstName: email.name.givenName,
            lastName: email.name.familyName,
            name: email.displayName,
            email: userEmail,
            avatar: Avatar,
          });

          await newUser.save();
          cb(null, newUser);
        }

        cb(null, doc);
      });
    }),
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, doc) => done(null, doc));
});
