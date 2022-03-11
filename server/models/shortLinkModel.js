import mongoose from 'mongoose';

const linkSchema = mongoose.Schema(
	{
		urlId: {
			type: String,
			required: true,
			unique: true,
		},
		longUrl: {
			type: String,
			required: true,
		},
		shortUrl: {
			type: String,
			required: true,
			unique: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		analytics: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Analytics',
		},
	},
	{ timestamps: true }
);
const ShortLink = mongoose.model('ShortLink', linkSchema);

export default ShortLink;
