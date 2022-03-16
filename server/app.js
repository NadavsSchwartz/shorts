import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import connectDB from './config/MongoDB.js';
import ShortenedLinkRoutes from './routes/ShortenedLinkRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import User from './models/userModel.js';
import cookieParser from 'cookie-parser';
import './strategies/GoogleStrategy.js';
import './strategies/TwitterStrategy.js';
import './strategies/GithubStrategy.js';

const app = express();

await dotenv.config();
// Load environment variables from .env file in non prod environments
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

await connectDB();

app.use(express.json());
app.set('trust proxy', true);
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
	? process.env.WHITELISTED_DOMAINS.split(',')
	: [];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},

	credentials: true,
};

app.use(cors(corsOptions));

app.set('trust proxy', 1);

app.use(
	session({
		secret: 'secretcode',
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	console.log('seri user:', user);
	return done(null, user._id);
});

passport.deserializeUser((id, done) => {
	return User.findById(id, (err, doc) => {
		// Whatever we return goes to the client and binds to the req.user property
		return done(null, doc);
	});
});

app.use('/', UserRoutes);
app.use('/', ShortenedLinkRoutes);

app.get('/', (req, res) => {
	return res.send({ status: 'success' });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV}, mode on port ${PORT}`)
);
