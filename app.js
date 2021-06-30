const express = require('express');
const path = require('path');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const sequelize = require('./utils/database');
const Post = require('./models/post');

const app = express();

// File management
const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    callback(null, 
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    );
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

// Parser Middleware
app.use(express.json());

// CORS headers (Allow access to all servers)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Static image serving
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/feed', feedRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.statusCode(status).json({
        message: message
    });
});

const port = 8080;

// Enable auto-creation of tables for models
sequelize.sync({
    // force: true
})
.then(() => {
    app.listen(port);
    console.log(`Listening on port ${port}`);
})
.catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    console.log(error);
    return next(error);
});