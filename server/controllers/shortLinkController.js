import ShortLink from '../models/shortLinkModel.js';
import Analytics from '../models/analyticsModel.js';
import uri from 'node-uri';

import { nanoid } from 'nanoid';
import axios from 'axios';
const shortBaseUrl = 'http://localhost:4000';
const { checkWebURL } = uri;

// @desc    delete Shortened Link Analytics
// @route   DELETE /url
export const deleteShortLink = async (req, res) => {
	console.log(req.user);
	const { shortUrl } = req.body;
	if (!shortUrl) return res.status(404).json({ message: 'no link found' });
	const isShortLink = await ShortLink.findOne({
		shortUrl: shortUrl,
	});
	if (isShortLink) {
		await isShortLink.remove();
		const ShortLinksAnalytics = await ShortLink.find({
			user: req.user._id,
		}).populate({
			path: 'analytics',
			options: { sort: { created_at: -1 } },
		});
		let AllClicks = 0;

		const modifiedAnalytics = [];

		await ShortLinksAnalytics.map((Link) => {
			// calculate total clicks of all links for easy management in front end
			AllClicks = Link.analytics.totalClicks + AllClicks;

			// calculate all locations of each non empty clicks location for easy management in front end
			if (Link.analytics.location.length !== 0)
				AllLocations.push(Link.analytics.location);

			// modify the array of object of ShortLinks and Analytics for easier management in front end
			modifiedAnalytics.push({
				id: Link._id,
				shortUrl: Link.shortUrl,
				siteIcon: Link.siteIcon,
				longUrl: Link.longUrl,
				createdAt: Link.createdAt,
				totalClicks: Link.analytics.totalClicks,
				clicks: Link.analytics.clicks,
				location: Link.analytics.location,
			});
		});

		return res.status(200).json({
			Analytics: modifiedAnalytics,
			TotalClicks: AllClicks || 0,
			TotalLinks: modifiedAnalytics.length,
			AllLocations: AllLocations,
		});
	} else {
		res.status(404);
		return new Error('Short Link not found');
	}
};

// @desc    Create New Shortened Link
// @route   POST /url
export const createNewShortenedLink = async (req, res) => {
	const url = new URL(req.body.longUrl);
	const urlOrigin = url.origin;
	try {
		const { longUrl } = req.body;

		// checks if there is long url within the request body AND that the long url is valid
		if (longUrl && checkWebURL(longUrl).valid === true) {
		}

		//generate unique 7 character long id for the short url
		const newUrlId = await nanoid(7);

		//checks if the short URL id already exists to avoid duplicate
		const isUrlIdExists = await ShortLink.find({ urlId: newUrlId });
		if (isUrlIdExists.length === 0);
		{
			const shortUrl = shortBaseUrl + '/' + newUrlId;
			const siteIcon = `${urlOrigin}/favicon.ico`;
			const newAnalytics = new Analytics();
			await newAnalytics.save();
			const itemToBeSaved = {
				longUrl,
				shortUrl,
				siteIcon,
				urlId: newUrlId,
				user: req.user._id,
				analytics: newAnalytics._id,
			};

			// Add the item to db
			const NewShortLink = new ShortLink(itemToBeSaved);
			await NewShortLink.save();
			await newAnalytics.updateOne({ shortLink: NewShortLink._id });
			await newAnalytics.save();

			const ShortLinksAnalytics = await ShortLink.find({
				user: req.user._id,
			}).populate({
				path: 'analytics',
				options: { sort: { created_at: -1 } },
			});

			let AllClicks = 0;

			let AllLocations = [];

			const modifiedAnalytics = [];

			await ShortLinksAnalytics.map((Link) => {
				// calculate total clicks of all links for easy management in front end
				AllClicks = Link.analytics.totalClicks + AllClicks;

				// calculate all locations of each non empty clicks location for easy management in front end
				if (Link.analytics.location.length !== 0)
					AllLocations.push(Link.analytics.location);

				// modify the array of object of ShortLinks and Analytics for easier management in front end
				modifiedAnalytics.push({
					id: Link._id,
					shortUrl: Link.shortUrl,
					siteIcon: Link.siteIcon,
					longUrl: Link.longUrl,
					createdAt: Link.createdAt,
					totalClicks: Link.analytics.totalClicks,
					clicks: Link.analytics.clicks,
					location: Link.analytics.location,
				});
			});

			return res.status(200).json({
				Analytics: modifiedAnalytics,
				TotalClicks: AllClicks || 0,
				TotalLinks: modifiedAnalytics.length,
				AllLocations: AllLocations,
			});
		}
	} catch (error) {
		console.error(error);
		res.status(401).json({ error: error });
	}
};

// @desc    Redirect to Shortened Link
// @route   GET /:id
export const redirectToShortenedLink = async (req, res) => {
	const shortenedLinkId = req.params.id;
	let foundShortenedLink;

	try {
		if (shortenedLinkId)
			foundShortenedLink = await ShortLink.findOne({
				urlId: shortenedLinkId,
			});
		if (foundShortenedLink) {
			const { data } = await axios.get(
				`https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`
			);
			console.log(data);
			const currentTime = new Date().toISOString().split('T', 1)[0];

			await Analytics.findOneAndUpdate(
				{
					shortLink: foundShortenedLink._id,
				},
				{
					$push: {
						location: data,
						clicks: { date: currentTime },
					},
					$inc: { totalClicks: 1 },
				},
				{ upsert: true, returnDocument: 'after' }
			);

			return res.redirect(foundShortenedLink.longUrl);
		}
	} catch (error) {
		console.error(error);
		return res.status(404).json(error);
	}
};
