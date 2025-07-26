const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config');

const registerUser = async (req, res) => {
    const { phone, password, displayName, experienceYears, address, level } = req.body;
    try {
        const existingUser = await User.findByPhone(phone);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ phone, password, displayName, experienceYears, address, level });
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                phone: user.phone,
                displayName: user.displayName,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Registration failed',
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    const { phone, password } = req.body;
    try {
        const user = await User.findByPhone(phone);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isMatch = await User.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: user.id, phone: user.phone },
            config.jwtSecret,
            { expiresIn: config.jwtExpiration }
        );
        res.status(200).json({
            message: 'Login successful',
            token,
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Login failed',
            error: error.message
        });
    }
};

const logoutUser = (req, res) => {
    const authHeader = req.headers['Authorization'];
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    res.status(200).json({
        message: 'Logout successful',
        token: token
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};