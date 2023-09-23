import { Router } from 'express'
import { prisma } from '../db'
import bcrypt from 'bcrypt'


const router = Router();

router.post('/login', async (req, res) => {
	const { email, password } = req.body

	// Find user by email
	const user = await prisma.user.findUnique({ 
		where: { email }
	})

	// Check if user exists
	if (!user) {
		return res.status(404).json({ message: 'User not found' }) 
	}

	// Validate password
	const isValid = await bcrypt.compare(password, user.password)

	if (!isValid) {
		return res.status(401).json({ message: 'Invalid credentials' })
	}

	/* Generate JWT Token
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

	res.status(200).json({
		message: 'Login successful!',
		token
	})*/

	res.status(200).json({message: 'Login successful'})

});

router.post('/register', async (req, res) => {

	const { name, email, password } = req.body

	// Check if email exists
	const emailAlreadyExists = await prisma.user.findUnique({
		where: { email }
	})

	if (emailAlreadyExists) {
		return res.status(400).json({ message: "Email already exists" })
	}

	// Encrypt password
	const hashedPassword = await bcrypt.hash(password, 10)

	const newUser = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword
		} 
	})

	res.status(201).json({ message: 'User register success' })
});

export default router;