import ShortLink from '../models/shortLinkModel.js'

export const getUserStats = async (req, res) => {
    try {
        const ShortLinksAnalytics = await ShortLink.find({
            user: req.user._id,
        }).populate({
            path: 'analytics',
            options: { sort: { created_at: -1 } },
        })

        // iterate through each click and calculate total clicks for ALL short links
        let AllClicks = 0

        // iterate through each location and and push to AllLocations all the non-empty location data
        const AllLocations = []

        const modifiedAnalytics = []
        await ShortLinksAnalytics.map((Link) => {
            // calculate total clicks of all links for easy management in front end
            AllClicks = Link.analytics.totalClicks + AllClicks

            // calculate all locations of each non empty clicks location for easy management in front end
            if (Link.analytics.location.length !== 0)
                AllLocations.push(Link.analytics.location)

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
            })
        })

        return res.status(200).json({
            Analytics: modifiedAnalytics,
            TotalClicks: AllClicks || 0,
            TotalLinks: modifiedAnalytics.length,
            AllLocations,
        })
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Something went wrong', data: { error } })
    }
}
