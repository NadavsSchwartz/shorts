import mongoose from 'mongoose';

const shortLinkSchema = new Schema({
	id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	clicks: Number,
});

export default model('ShortLink', shortLinkSchema);
