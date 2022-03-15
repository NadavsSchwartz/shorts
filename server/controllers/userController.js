import ShortLink from '../models/shortLinkModel.js';

export const getUserStats = async (req, res) => {
	try {
		const Analytics = await ShortLink.find({ user: req.user._id }).populate({
			path: 'analytics',
			options: { sort: { created_at: -1 } },
		});
		let totalClicks = 0;

		await Analytics.forEach(async (ShortLink) => {
			return (totalClicks =
				(await ShortLink.analytics.TotalClicks) + totalClicks);
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
		console.log(error);
		return res
			.status(500)
			.json({ message: 'Something went wrong', data: { error } });
	}
};
