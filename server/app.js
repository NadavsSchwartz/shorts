import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import connectDB from './config/MongoDB.js';
import usersRoutes from './routes/User.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from './models/userModel.js';

dotenv.config();

await connectDB();
const app = express();

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	return done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, doc) => {
		return done(null, doc);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: `${process.env.GOOGLE_CLIENT_ID}`,
			clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
			callbackURL: '/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, email, cb) {
			const userEmail = email.emails[0].value;
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
					});

					await newUser.save();
					cb(null, newUser);
				}
				cb(null, doc);
			});
		}
	)
);
app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['openid', 'profile', 'email'],
	})
);

app.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: 'http://localhost:3000',
		session: true,
	}),
	function (req, res) {
		res.redirect('http://localhost:3000');
	}
);

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.get('/', (req, res) => {
	res.send('API is running....');
});

app.use('/api/v1/', usersRoutes);

app.get('/me', (req, res) => {
	res.send(req.user);
});

app.get('/logout', (req, res) => {
	if (req.user) {
		req.logout();
		res.send('success');
	}
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV}, mode on port ${PORT}`)
);
