import express from 'express';
import {
	getShortenedLinkAnalytics,
	createNewShortenedLink,
	redirectToShortenedLink,
} from '../controllers/hotelController.js';
const router = express.Router();

router.route('/url/:id').get(getShortenedLinkAnalytics);
router.route('/:id').get(redirectToShortenedLink).post(createNewShortenedLink);

export default router;
