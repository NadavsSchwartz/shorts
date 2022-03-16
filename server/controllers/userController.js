import ShortLink from '../models/shortLinkModel.js';

export const getUserStats = async (req, res) => {
	try {
		const ShortLinksAnalytics = await ShortLink.find({
			user: req.user._id,
		}).populate({
			path: 'analytics',
			options: { sort: { created_at: -1 } },
		});

		//iterate through each click and calculate total clicks for ALL short links
		let AllClicks = 0;
		await ShortLinksAnalytics.forEach(async (ShortLink) => {
			return (AllClicks = (await ShortLink.analytics.totalClicks) + AllClicks);
		});

		//iterate through each location and and push to AllLocations all the non-empty location data
		let AllLocations = [];
		await ShortLinksAnalytics.map((Link) => {
			if (Link.analytics.location.length !== 0)
				AllLocations.push(Link.analytics.location);
		});

		const { location, clicks } = ShortLinksAnalytics;

		return res.status(200).json({
			Analytics: ShortLinksAnalytics,
			TotalClicks: AllClicks,
			TotalLinks: ShortLinksAnalytics.length,
			AllLocations: AllLocations,
			locations: location,
			clicks: clicks,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: 'Something went wrong', data: { error } });
	}
};
