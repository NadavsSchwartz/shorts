import mongoose from 'mongoose';

const analyticsSchema = mongoose.Schema(
  {
    totalClicks: {
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
    clicks: { type: Array, require: true },
  },
  { timestamps: true },
);
const Analytics = mongoose.model('Analytics', analyticsSchema);
export default Analytics;
