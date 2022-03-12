import ShortLink from '../models/shortLinkModel.js';
import Analytics from '../models/analyticsModel.js';
import uri from 'node-uri';

import { nanoid } from 'nanoid';
import axios from 'axios';
const shortBaseUrl = 'http://localhost:4000';
// @desc    Get Shortened Link Analytics
// @route   GET /api/v1/link/:id
const { checkWebURL } = uri;
export const getShortenedLinkAnalytics = () => {};

// @desc    Create New Shortened Link
// @route   POST /api/v1/url
export const createNewShortenedLink = async (req, res) => {
	try {
		const { longUrl } = req.body;

		if (longUrl && checkWebURL(longUrl).valid === true) {
		}

		const { status } = await axios.head(longUrl, { timeout: 5000 });

		// check if link is in the database
		// urlData = await ShortLink.findOne({ longUrl: longUrl });
		if (status !== 200) {
			return res.status(401).json({ error: status });
		}
		// if (!urlData) {
		const newUrlId = await nanoid(7);

		const isUrlIdExists = await ShortLink.find({ urlId: newUrlId });
		if (isUrlIdExists.length === 0);
		{
			const shortUrl = shortBaseUrl + '/' + newUrlId;
			const siteIcon = `https://f1.allesedv.com/36/${longUrl}`;
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

			await NewShortLink.populate('analytics');

			res.status(200).json(NewShortLink);
		}
	} catch (error) {
		console.error(error);
		res.status(401).json({ error: error });
	}
};

// @desc    Redirect to Shortened Link
// @route   GET /api/v1/:id
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
				`https://ipinfo.io/json/?${req.ip}?token=560f38041f5660`
			);
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
					$inc: { TotalClicks: 1 },
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
