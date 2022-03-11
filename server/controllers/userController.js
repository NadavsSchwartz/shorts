import User from '../models/userModel.js';
import ShortLink from '../models/shortLinkModel.js';

// export const login = async (req, res, next) => {
// 	passport.authenticate('local');

// 	const token = getToken({ _id: req.user._id });
// 	const refreshToken = getRefreshToken({ _id: req.user._id });
// 	User.findById(req.user._id).then(
// 		(user) => {
// 			user.refreshToken.push({ refreshToken });
// 			user.save((err, user) => {
// 				if (err) {
// 					res.status(500).json(err);
// 				} else {
// 					res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
// 					res.send({ success: true, token });
// 				}
// 			});
// 		},
// 		(err) => next(err)
// 	);
// };
// export const signup = async (req, res) => {
// 	const { firstName, lastName, email, password } = req.body;
// 	try {
// 		User.register(new User({ email: email }), password, (error, user) => {
// 			if (error) {
// 				res.status(500).json(error);
// 				console.error(error);
// 			} else {
// 				user.firstName = firstName || '';
// 				user.lastName = lastName || '';
// 				user.name = `${firstName} ${lastName}`;

// 				user.save((error, user) => {
// 					if (error) {
// 						res.status(500).json(error);
// 						console.error(error);
// 					} else {
// 						res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
// 						res.send({ success: true, token });
// 					}
// 				});
// 			}
// 		});
// 	} catch (error) {
// 		res.status(500).json(error);
// 	}
// };

// export const generateRefreshToken = async (req, res, next) => {
// 	const { signedCookies = {} } = req;
// 	const { refreshToken } = signedCookies;

// 	if (refreshToken) {
// 		try {
// 			const payload = jwt.verify(
// 				refreshToken,
// 				process.env.REFRESH_TOKEN_SECRET
// 			);
// 			const userId = payload._id;
// 			User.findOne({ _id: userId }).then(
// 				(user) => {
// 					if (user) {
// 						// Find the refresh token against the user record in database
// 						const tokenIndex = user.refreshToken.findIndex(
// 							(item) => item.refreshToken === refreshToken
// 						);

// 						if (tokenIndex === -1) {
// 							res.statusCode = 401;
// 							res.send('Unauthorized');
// 						} else {
// 							const token = getToken({ _id: userId });
// 							// If the refresh token exists, then create new one and replace it.
// 							const newRefreshToken = getRefreshToken({ _id: userId });
// 							user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
// 							user.save((err, user) => {
// 								if (err) {
// 									res.status(500).json(err);
// 								} else {
// 									res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);
// 									res.send({ success: true, token });
// 								}
// 							});
// 						}
// 					} else {
// 						res.status(401).json('Unauthorized');
// 					}
// 				},
// 				(err) => next(err)
// 			);
// 		} catch (err) {
// 			res.statusCode = 401;
// 			res.send('Unauthorized');
// 		}
// 	} else {
// 		res.statusCode = 401;
// 		res.send('Unauthorized');
// 	}
// };
export const getUserStats = async (req, res) => {
	try {
		await User.findById(req.user._id);
		const Analytics = await ShortLink.find({ user: req.user._id }).populate({
			path: 'analytics',
			options: { sort: { created_at: -1 } },
		});
		let totalClicks = 0;
		await Analytics.forEach(async (ShortLink) => {
			return (totalClicks = (await ShortLink.analytics.clicks) + totalClicks);
		});
		const totalLinks = Analytics.length;
		let AllLocations = [];
		await Analytics.map((Link) => {
			if (Link.analytics.location.length !== 0)
				AllLocations.push(Link.analytics.location);
		});

		return res.status(200).json({
			Analytics: Analytics,
			TotalClicks: totalClicks,
			TotalLinks: totalLinks,
			AllLocations: AllLocations,
		});
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong', data: { error } });

		console.log(error);
	}
};
