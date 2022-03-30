import { nanoid } from 'nanoid'
import axios from 'axios'
import ShortLink from '../models/shortLinkModel.js'
import Analytics from '../models/analyticsModel.js'
import isbot from 'isbot'
import { UnifyResponseObject } from '../utils/UnifyResponseObject.js'
import { GoogleMalwareDetector } from '../utils/Malware.js'
const shortBaseUrl = 'https://sds.sh'

// @desc    delete Shortened Link Analytics
// @route   DELETE /delete/:id
export const deleteShortLink = async (req, res) => {
    const urlId = req.params.urlId
    if (!urlId) return res.status(404).json({ message: 'url id is required' })
    const isShortLink = await ShortLink.findOne(
        {
            urlId: urlId,
        },
        '-user -__v'
    )
    if (!isShortLink) throw new Error('Short Link not found')

    await isShortLink.remove()

    const ShortLinksAnalytics = await ShortLink.find({
        user: req.user._id,
    }).populate({
        path: 'analytics',
        options: { sort: { created_at: -1 } },
        select: '-shortLink -_id -__v',
    })
    const unifiedResponseObject = await UnifyResponseObject(ShortLinksAnalytics)

    return res.status(200).json(unifiedResponseObject)
}

// @desc    Create New Shortened Link
// @route   POST /url
export const createNewShortenedLink = async (req, res) => {
    // checks if there is long url within the request body
    if (!req.body.longUrl)
        return res.status(500).json({ message: 'longUrl is required' })

    let urlToBeShortened = req.body.longUrl.trim()

    // adds scheme to url if it doesn't exists
    if (
        !urlToBeShortened.indexOf('http://') == 0 &&
        !urlToBeShortened.indexOf('https://') == 0
    )
        urlToBeShortened = `http://${req.body.longUrl}`

    const isMalware = await GoogleMalwareDetector(urlToBeShortened)
    if (isMalware) return res.status(400).json({ message: 'Malware Detected.' })
    const url = new URL(urlToBeShortened)

    // generate unique 7 character long id for the short url
    let newUrlId = nanoid(7)

    // checks if the short URL id already exists to avoid duplicate
    //todo - move into a util function to also handle case of duplicate
    const isUrlIdExists = await ShortLink.find({ urlId: newUrlId })
    if (isUrlIdExists.length !== 0);
    newUrlId = nanoid(7)

    //generate new Analytics
    const newAnalytics = new Analytics()
    await newAnalytics.save()

    // Add the link to db
    const NewShortLink = new ShortLink({
        longUrl: urlToBeShortened,
        shortUrl: `${shortBaseUrl}/${newUrlId}`,
        siteIcon: `${url.origin}/favicon.ico`,
        urlId: newUrlId,
        user: req.user ? req.user._id : null,
        analytics: newAnalytics._id,
    })
    await NewShortLink.save()

    // update analytics with created shortLink
    await newAnalytics.updateOne({ shortLink: NewShortLink._id })
    await newAnalytics.save()

    //populate analytics along with the newly created shortlink
    const ShortLinksAnalytics = await NewShortLink.populate({
        path: 'analytics',
        options: { sort: { created_at: -1 } },
        select: '-shortLink -_id -__v',
    })
    if (!req.user) return res.status(201).json(ShortLinksAnalytics)

    const analytics = await ShortLink.find(
        {
            user: req.user._id,
        },
        '-user -__v'
    ).populate({
        path: 'analytics',
        options: { sort: { created_at: -1 } },
        select: '-shortLink -_id -__v',
    })
    const unifiedResponseObject = await UnifyResponseObject(analytics)

    return res.status(200).json(unifiedResponseObject)
}

// @desc    Redirect to Shortened Link
// @route   GET /:id
export const redirectToShortenedLink = async (req, res) => {
    const isBot = isbot(req.headers['user-agent'])
    const shortenedLinkId = req.params.id

    const shortenedLink = await ShortLink.findOne({
        urlId: shortenedLinkId,
    })

    // if link is not found, redirect to not found
    if (!shortenedLink)
        return res.redirect(301, 'https://shorten.domains/not-found')

    //if visit isn't made by a detected bot, create analytics
    if (!isBot) {
        const { data } = await axios.get(
            `https://ipinfo.io/${req.headers['x-forwarded-for']}?token=${process.env.IPINFO_TOKEN}`
        )
        const currentTime = new Date().toISOString().split('T', 1)[0]

        await Analytics.findOneAndUpdate(
            {
                shortLink: shortenedLink._id,
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
    }

    //redirect to target long url
    return res.redirect(shortenedLink.longUrl)
}

// @desc    Get Shortened Link Analytics
// @route   GET /url/:id
export const getShortenedLinkAanlytics = async (req, res) => {
    const urlId = req.params.id

    //attempt to find link
    const foundShortenedLink = await ShortLink.findOne(
        {
            urlId,
        },
        '-user -__v'
    )

    //if link is not found, return error
    if (!foundShortenedLink) {
        throw new Error('Link could not be found.')
    }

    // if link is found, populate the links analytics
    await foundShortenedLink.populate({
        path: 'analytics',
        options: { sort: { created_at: -1 } },
        select: '-shortLink -_id -__v',
    })
    return res.status(200).json(foundShortenedLink)
}
