import express from 'express'
import {
    createNewShortenedLink,
    redirectToShortenedLink,
    deleteShortLink,
    getShortenedLinkAanlytics,
} from '../controllers/shortLinkController.js'

const router = express.Router()

router.route('/:id').get(redirectToShortenedLink)
router.route('/url').post(createNewShortenedLink)
router.route('/delete/:id').delete(deleteShortLink)
router.route('/url/:id').get(getShortenedLinkAanlytics)

export default router
