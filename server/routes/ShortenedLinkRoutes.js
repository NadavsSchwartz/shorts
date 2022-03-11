import express from 'express';
import {
	getShortenedLinkAnalytics,
	createNewShortenedLink,
	redirectToShortenedLink,
} from '../controllers/shortLinkController.js';
const router = express.Router();
router.route('/:id/analytics').get(getShortenedLinkAnalytics);
router.route('/:id').get(redirectToShortenedLink);
router.route('/url').post(createNewShortenedLink);

export default router;
