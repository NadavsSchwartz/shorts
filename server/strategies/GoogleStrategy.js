import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

passport.use(
	new GoogleStrategy(
		{
			clientID: `${process.env.GOOGLE_CLIENT_ID}`,
			clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
			callbackURL: '/auth/google/callback',
		},
		function (_, __, profile, email, cb) {
			const userEmail = email.emails[0].value;
			console.log(profile.id_token);
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
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, doc) => {
		return done(null, doc);
	});
});
