const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlackListModel = require('../models/blacklist.model');
/**
 * @desc Register a new user controller,expecting username,email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide username, email, and password' });
        }

        const isUseralreadyExists = await userModel.findOne({ $or: [{ username }, { email }] });

        if (isUseralreadyExists) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);



        // Create new user
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        })

        //token creation
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token).status(201).json({ message: 'User registered successfully', user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};


/**
 * @desc Login user controller, expecting email and password in the request body
 * @access Public
 */

async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //token creation
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token).status(200).json({ message: 'User logged in successfully', user: { id: user._id, username: user.username, email: user.email } });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in user' });
    }
};

/**
 * @desc Logout user controller, clear the token cookie and add the token to blacklist
 * @access Public
 */

async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }
        // Add the token to the blacklist
        await tokenBlackListModel.create({ token });
        // Clear the cookie
        res.clearCookie('token').status(200).json({ message: 'User logged out successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error logging out user' });
    }      
};

/**
 * @desc Get the user data of the logged in user
 * @access Private
 */
async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User data fetched successfully', user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data' });
    }
};

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
};
