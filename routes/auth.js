const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', [
    body('email')
        .isEmail()
        .custom((value, { req }) => {
            console.log({value});
            return User.findAll({where: {email: value}})
                .then(([user]) => {
                    if (user) {
                        console.log(user);
                        return Promise.reject("Email Adress already exists");
                    }
                })
        })
        .normalizeEmail(),
    body('password')
        .isLength({min: 5}),
    body('name')
        .trim()
        .not().isEmpty()
], authController.signup);

router.post('/login', authController.login);

module.exports = router;