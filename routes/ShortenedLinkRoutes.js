import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import {
    createNewShortenedLink,
    redirectToShortenedLink,
    deleteShortLink,
    getShortenedLinkAanlytics,
} from '../controllers/shortLinkController.js'

const router = Router()

router.route('/:id').get(asyncHandler(redirectToShortenedLink))
router.route('/url').post(asyncHandler(createNewShortenedLink))
router.route('/delete/:urlId').delete(asyncHandler(deleteShortLink))
router.route('/url/:id').get(asyncHandler(getShortenedLinkAanlytics))

export default router
