import { nanoid } from 'nanoid'
import axios from 'axios'
import ShortLink from '../models/shortLinkModel.js'
import Analytics from '../models/analyticsModel.js'

const shortBaseUrl = 'https://sds.sh'

// @desc    delete Shortened Link Analytics
// @route   DELETE /delete/:id
export const deleteShortLink = async (req, res) => {
    const { urlId } = req.params.id
    if (!urlId) return res.status(404).json({ message: 'url id is required' })
    const isShortLink = await ShortLink.findOne(
        {
            urlId,
        },
        '-user -__v'
    )
    if (isShortLink) {
        await isShortLink.remove()
        const ShortLinksAnalytics = await ShortLink.find({
            user: req.user._id,
        }).populate({
            path: 'analytics',
            options: { sort: { created_at: -1 } },
            select: '-shortLink -_id -__v',
        })
        let AllClicks = 0
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
    }
    res.status(404)
    return new Error('Short Link not found')
}

// @desc    Create New Shortened Link
// @route   POST /url
export const createNewShortenedLink = async (req, res) => {
    // checks if there is long url within the request body
    if (req.body.longUrl) {
        try {
            let isUrlContainProtocol = req.body.longUrl

            // adds scheme to url if it doesn't exists
            if (
                !isUrlContainProtocol.indexOf('http://') == 0 &&
                !isUrlContainProtocol.indexOf('https://') == 0
            )
                isUrlContainProtocol = `http://${req.body.longUrl}`

            const url = new URL(isUrlContainProtocol)
            const urlOrigin = url.origin

            const { longUrl } = req.body

            // generate unique 7 character long id for the short url
            const newUrlId = await nanoid(7)

            // checks if the short URL id already exists to avoid duplicate
            //todo - move into a util function to also handle case of duplicate
            const isUrlIdExists = await ShortLink.find({ urlId: newUrlId })
            if (isUrlIdExists.length === 0);
            {
                const shortUrl = `${shortBaseUrl}/${newUrlId}`
                const siteIcon = `${urlOrigin}/favicon.ico`
                const newAnalytics = new Analytics()
                await newAnalytics.save()
                const linkToBeSaved = {
                    longUrl,
                    shortUrl,
                    siteIcon,
                    urlId: newUrlId,
                    user: req.user ? req.user._id : null,
                    analytics: newAnalytics._id,
                }

                // Add the link to db
                const NewShortLink = new ShortLink(linkToBeSaved)
                await NewShortLink.save()
                await newAnalytics.updateOne({ shortLink: NewShortLink._id })
                await newAnalytics.save()
                if (req.user) {
                    const ShortLinksAnalytics = await ShortLink.find(
                        {
                            user: req.user._id,
                        },
                        '-user -__v'
                    ).populate({
                        path: 'analytics',
                        options: { sort: { created_at: -1 } },
                        select: '-shortLink -_id -__v',
                    })

                    let AllClicks = 0

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
                }
                await NewShortLink.populate({
                    path: 'analytics',
                    select: '-shortLink -_id -__v',
                })
                return res.status(200).json(NewShortLink)
            }
        } catch (error) {
            console.error(error)
            return res.status(401).json({ error })
        }
    } else {
        return res.status(401).json({ message: 'longUrl is required' })
    }
}

// @desc    Redirect to Shortened Link
// @route   GET /:id
export const redirectToShortenedLink = async (req, res) => {
    const shortenedLinkId = req.params.id

    let foundShortenedLink

    try {
        if (shortenedLinkId) {
            foundShortenedLink = await ShortLink.findOne({
                urlId: shortenedLinkId,
            })
        }
        if (foundShortenedLink) {
            const { data } = await axios.get(
                `https://ipinfo.io/${req.headers['x-forwarded-for']}?token=${process.env.IPINFO_TOKEN}`
            )

            const currentTime = new Date().toISOString().split('T', 1)[0]

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
            )

            return res.redirect(foundShortenedLink.longUrl)
        }
    } catch (error) {
        console.error(error)
        return res.status(404).json(error)
    }
}

// @desc    Get Shortened Link Analytics
// @route   GET /url/:id
export const getShortenedLinkAanlytics = async (req, res) => {
    const urlId = req.params.id
    let foundShortenedLink

    try {
        if (urlId) {
            foundShortenedLink = await ShortLink.findOne(
                {
                    urlId,
                },
                '-user -__v'
            )
        }
        if (foundShortenedLink) {
            await foundShortenedLink.populate({
                path: 'analytics',
                options: { sort: { created_at: -1 } },
                select: '-shortLink -_id -__v',
            })
            return res.status(200).json(foundShortenedLink)
        }
    } catch (error) {
        console.error(error)
        return res.status(404).json(error)
    }
}
