import mongoose from 'mongoose';

const analyticsSchema = mongoose.Schema(
	{
		clicks: {
			type: Number,
			required: true,
			default: 0,
		},
		shortLink: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ShortLink',
		},
		location: {
			type: Array,
			require: false,
		},
	},
	{ timestamps: true }
);
const Analytics = mongoose.model('Analytics', analyticsSchema);
export default Analytics;
