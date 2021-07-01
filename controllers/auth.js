const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    const { email, name, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            return User.create({
                email: email,
                name: name,
                password: hashedPassword
            })
        })
        .then(user => {
            res.status(201).json({
                message: "User created!",
                userId: user.id,
            })
        })
        .catch(err => {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        })
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    let fetchedUser;

    User.findAll({ where: {email: email} })
        .then(([user]) => {
            if (!user) {
                const error = new Error("User with email not found");
                error.statusCode = 404;
                throw error;
            }
            fetchedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error("Incorrect password");
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: fetchedUser.email,
                    userId: fetchedUser.id
                },
                'SUPER SECRET PRIVATE KEY GOES HERE',
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token: token,
                userId: fetchedUser.id,
            })
        })
        .catch(err => {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        })
}