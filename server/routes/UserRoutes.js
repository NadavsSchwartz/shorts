import express from 'express';
import passport from 'passport';
import { getUserStats } from '../controllers/userController.js';

const router = express.Router();

router.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['openid', 'profile', 'email'],
	})
);

router.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: 'http://localhost:3000/signin',
		failureMessage: true,
		session: true,
	}),
	function (req, res) {
		res.redirect('http://localhost:3000/home');
	}
);

router.get('/auth/logout', (req, res) => {
	if (req.user) {
		req.session.destroy();
		res.clearCookie('connect.sid'); // clean up!
		return res.json({ msg: 'logging you out' });
	} else {
		return res.json({ msg: 'no user to log out!' });
	}
});
router.get('/me', (req, res, next) => {
	if (req.user) res.send(req.user);
	res.status(400).json({ message: 'no user found' });
});

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get(
	'/auth/twitter/callback',
	passport.authenticate('twitter', {
		failureRedirect: 'http://localhost:3000/',
		session: true,
		failureMessage: true,
	}),
	function (req, res) {
		res.redirect('http://localhost:3000/home');
	}
);

router.get('/auth/github', passport.authenticate('github'));

router.get(
	'/auth/github/callback',
	passport.authenticate('github', {
		failureRedirect: 'http://localhost:3000/',
		session: true,
		failureMessage: true,
	}),
	function (req, res) {
		res.redirect('http://localhost:3000/home');
	}
);
router.get('/user/stats', getUserStats);

export default router;
