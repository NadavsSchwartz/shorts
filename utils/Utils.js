import ShortLink from '../models/shortLinkModel.js'
import { customAlphabet as generate } from 'nanoid/async'
import {
    differenceInDays,
    differenceInHours,
    differenceInMonths,
} from 'date-fns'
//generate new unique urlId, and return it only if it doesn't exists. if it exists. run again,
// till a unique urlId has been generated
export const generateId = async () => {
    const urlId = await generate(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        7
    )
    const link = await ShortLink.find({ urlId: urlId })
    if (!link) return urlId
    return generateId()
}

export const getDifferenceFunction = (type) => {
    if (type === 'lastDay') return differenceInHours
    if (type === 'lastWeek') return differenceInDays
    if (type === 'lastMonth') return differenceInDays
    if (type === 'allTime') return differenceInMonths
    throw new Error('Unknown type.')
}

export const getUTCDate = (dateString) => {
    const date = new Date(dateString || Date.now())
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours()
    )
}

export const STATS_PERIODS = [
    [1, 'lastDay'],
    [7, 'lastWeek'],
    [30, 'lastMonth'],
]
