import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: false,
		},
		lastName: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: false,
		},
		token: {
			required: false,
			type: String,
		},
		googleId: {
			required: false,
			type: String,
			unique: true,
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
	{
		timestamps: true,
	}
);

userSchema.methods.generateToken = async function () {
	let user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
		expiresIn: '72h',
	});
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.statics.findByToken = async function (token) {
	let User = this;
	let decoded;
	try {
		if (!token) {
			return new Error('Missing token header');
		}
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return error;
	}
	return await User.findOne({
		_id: decoded._id,
		'tokens.token': token,
	});
};

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
