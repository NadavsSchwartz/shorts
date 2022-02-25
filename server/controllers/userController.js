import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModal from '../models/userModel.js';
dotenv.config();
const secret = process.env.JWT_SECRET;
console.log('secret', secret);
export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const oldUser = await UserModal.findOne({ email });

		if (!oldUser)
			return res.status(404).json({ message: "User doesn't exist" });

		const isPasswordCorrect = await oldUser.matchPassword(password);
		console.log(isPasswordCorrect);
		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Invalid credentials' });

		const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
			expiresIn: '1d',
		});
		oldUser.tokens = token;
		res.status(200).json({ result: oldUser });
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong' });
	}
};

export const signup = async (req, res) => {
	const { email, password, firstName, lastName } = req.body;

	try {
		const oldUser = await UserModal.findOne({ email });

		if (oldUser)
			return res.status(400).json({ message: 'User already exists' });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await UserModal.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
			firstName: firstName,
			lastName: lastName,
		});
		const token = jwt.sign({ email: result.email, id: result._id }, secret, {
			expiresIn: '1h',
		});
		result.tokens = token;
		result.save();

		res.status(201).json({ result });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });

		console.log(error);
	}
};
