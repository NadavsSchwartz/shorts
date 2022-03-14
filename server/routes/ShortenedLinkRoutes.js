import express from 'express';
import {
	createNewShortenedLink,
	redirectToShortenedLink,
	deleteShortLink,
} from '../controllers/shortLinkController.js';
const router = express.Router();
// router.route('/:id/analytics').get(getShortenedLinkAnalytics);
router.route('/:id').get(redirectToShortenedLink);
router.route('/url').post(createNewShortenedLink).delete(deleteShortLink);

export default router;
