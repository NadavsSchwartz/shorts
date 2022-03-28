export const UnifyResponseObject = async (Analytics) => {
    let AllClicks = 0
    const AllLocations = []
    const modifiedAnalytics = []
    await Analytics.map((Link) => {
        // calculate total clicks of all links for easy management in front end
        AllClicks = Link.analytics.totalClicks + AllClicks

        // calculate all locations of each non empty clicks location for easy management in front end
        if (Link.analytics.location.length !== 0)
            AllLocations.push(Link.analytics.location)

        // modify the array of object of ShortLinks and Analytics for easier management in front end
        return modifiedAnalytics.push({
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

    return {
        Analytics: modifiedAnalytics,
        TotalClicks: AllClicks || 0,
        TotalLinks: modifiedAnalytics.length,
        AllLocations,
    }
}
