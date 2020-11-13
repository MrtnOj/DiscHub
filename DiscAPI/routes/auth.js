const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
        return User.findOne({email: value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-mail address already exists!');
            }
        });
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
    body('name')
    .trim()
    .isLength( {min: 3, max: 12})
    .withMessage('Username must be between 3 and 12 characters.')
    ],
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;