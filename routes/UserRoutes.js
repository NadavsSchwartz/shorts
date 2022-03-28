import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import { getUserStats } from '../controllers/userController.js'

const router = Router()

router.get(
    '/auth/google',
    asyncHandler(
        passport.authenticate('google', {
            scope: ['openid', 'profile', 'email'],
        })
    )
)

router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.FRONT_END_URL}/signin`,
        failureMessage: true,
        session: true,
    }),
    asyncHandler((req, res) => res.redirect('http://localhost:3000/home'))
)

router.get(
    '/auth/logout',
    asyncHandler(async (req, res) => {
        if (req.user) {
            await req.session.destroy()
            await res.clearCookie('connect.sid')
            return res.status(200).json({ message: 'logout success' })
        }
        return res.status(200).json({ message: 'no user to log out!' })
    })
)

router.get(
    '/me',
    asyncHandler((req, res) => {
        if (req.user) return res.send(req.user)
        return res.status(400).json({ message: 'no user found' })
    })
)

router.get('/auth/twitter', asyncHandler(passport.authenticate('twitter')))

router.get(
    '/auth/twitter/callback',

    passport.authenticate('twitter', {
        failureRedirect: `${process.env.FRONT_END_URL}/signin`,
        session: true,
        failureMessage: true,
    }),
    (req, res) => res.redirect(`${process.env.FRONT_END_URL}/home`)
)

router.get('/auth/github', asyncHandler(passport.authenticate('github')))

router.get(
    '/auth/github/callback',
    asyncHandler(
        passport.authenticate('github', {
            failureRedirect: `${process.env.FRONT_END_URL}/signin`,
            session: true,
            failureMessage: true,
        }),
        (req, res) => res.redirect(`${process.env.FRONT_END_URL}/home`)
    )
)

router.get('/user/stats', asyncHandler(getUserStats))

// router.post('/auth/apiKey', asyncHandler(generateApiKey))

export default router
