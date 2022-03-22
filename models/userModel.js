import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
    },
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    authority: {
      type: String,
    },

    googleId: {
      type: String,
      default: '',
    },

    avatar: {
      type: String,
    },
    twitterId: {
      required: false,
      type: String,
    },
    githubId: {
      required: false,
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

userSchema.virtual('ShortLinks', {
  ref: 'ShortLink',
  foreignField: 'user',
  localField: '_id',
});
const User = mongoose.model('User', userSchema);

export default User;
