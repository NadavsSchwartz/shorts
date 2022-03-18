import express from 'express';
import {
	createNewShortenedLink,
	redirectToShortenedLink,
	deleteShortLink,
} from '../controllers/shortLinkController.js';
const router = express.Router();

router.route('/:id').get(redirectToShortenedLink);
router.route('/url').post(createNewShortenedLink);
router.route('/delete/url').delete(deleteShortLink);

export default router;
