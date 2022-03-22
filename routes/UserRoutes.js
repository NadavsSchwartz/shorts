import express from 'express'
import passport from 'passport'
import { getUserStats } from '../controllers/userController.js'

const router = express.Router()

router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: [
            'openid',
            'profile',
            'email',
            'https://www.googleapis.com/auth/user.addresses.read',
            'https://www.googleapis.com/auth/user.birthday.read',
            'https://www.googleapis.com/auth/user.gender.read',
        ],
    })
)

router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.FRONT_END_URL}/signin`,
        failureMessage: true,
        session: true,
    }),
    (req, res) => res.redirect(`${process.env.FRONT_END_URL}/home`)
)

router.get('/auth/logout', async (req, res) => {
    if (req.user) {
        await req.session.destroy()
        await res.clearCookie('connect.sid')
        return res.status(200).json({ message: 'logout success' })
    }
    return res.status(200).json({ message: 'no user to log out!' })
})
router.get('/me', (req, res) => {
    if (req.user) return res.send(req.user)
    return res.status(400).json({ message: 'no user found' })
})

router.get('/auth/twitter', passport.authenticate('twitter'))

router.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: `${process.env.FRONT_END_URL}/signin`,
        session: true,
        failureMessage: true,
    }),
    (req, res) => res.redirect(`${process.env.FRONT_END_URL}/home`)
)

router.get('/auth/github', passport.authenticate('github'))

router.get(
    '/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: `${process.env.FRONT_END_URL}/signin`,
        session: true,
        failureMessage: true,
    }),
    (req, res) => res.redirect(`${process.env.FRONT_END_URL}/home`)
)
router.get('/user/stats', getUserStats)

export default router
