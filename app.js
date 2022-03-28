import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import asyncHandler from 'express-async-handler'
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
import helmet from 'helmet'
import MongoStore from 'connect-mongo'

const app = express()

dotenv.config()
connectDB()

// Load environment variables from .env file in non prod environments
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(helmet())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.header('Origin'))
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    )
    next()
})
app.set('trust proxy', true)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))

// Add the domains to the CORS policy
// const whitelist = [
//     'https://shorten.domains',
//     'https://shorts-client.pages.dev',
//     'http://localhost:3000',
//     'http://127.0.0.1:3000',
// ]

// const corsOptions = {
//     credentials: true,

//     origin(origin, callback) {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
// }

// app.use(cors(corsOptions))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        proxy: true,
        cookie: {
            sameSite: 'none',
            secure: true,
            httpOnly: false,
        },
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    return done(null, user._id)
})

passport.deserializeUser((id, done) =>
    User.findById(id, (err, doc) => done(null, doc))
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

app.use('/url', apiLimiter)
app.use('/', UserRoutes)
app.use('/', ShortenedLinkRoutes)
app.get(
    '/',
    asyncHandler((req, res) => res.send({ status: 'success' }))
)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV}, mode on port ${PORT}`
    )
)
