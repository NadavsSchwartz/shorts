import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import connectDB from './config/MongoDB.js'
import ShortenedLinkRoutes from './routes/ShortenedLinkRoutes.js'
import UserRoutes from './routes/UserRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import User from './models/userModel.js'
import './strategies/GoogleStrategy.js'
import './strategies/TwitterStrategy.js'
import './strategies/GithubStrategy.js'

const app = express()

dotenv.config()
// Load environment variables from .env file in non prod environments
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
connectDB()

app.use(express.json())
app.set('trust proxy', true)
app.use(cookieParser(process.env.COOKIE_SECRET))

// Add the domains to the CORS policy
const whitelist = process.env.WHITELISTED_DOMAINS
    ? process.env.WHITELISTED_DOMAINS.split(',')
    : 'https://shorten.domains'

const corsOptions = {
    origin(origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },

    credentials: true,
}

app.use(cors(corsOptions))

app.set('trust proxy', 1)

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            sameSite: 'none',
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
        },
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    console.log('seri user:', user)
    return done(null, user._id)
})

passport.deserializeUser((id, done) =>
    User.findById(id, (err, doc) =>
        // Whatever we return goes to the client and binds to the req.user property
        done(null, doc)
    )
)

const apiLimiter = rateLimit({
    windowMs: 1440 * 60 * 1000, // 24 hours
    // Limit each IP to 100 requests daily for user, and 30 for non-user
    max: (req) => {
        if (req.user) return 100
        return 30
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'You have reached your daily quota.',
})

// Apply the rate limiting middleware to API calls only
app.use('/url', apiLimiter)
app.use('/', UserRoutes)
app.use('/', ShortenedLinkRoutes)
app.get('/', (req, res) => res.send({ status: 'success' }))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV}, mode on port ${PORT}`
    )
)
