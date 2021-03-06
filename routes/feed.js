const express = require('express');
const { body } = require('express-validator/check');

const postsController = require('../controllers/posts')
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// (GET)/feed/posts
router.get('/posts', isAuth, postsController.getPosts);

// (GET)/feed/post
router.get('/post/:postId', isAuth, postsController.getPost);

// (POST)/feed/posts
router.post('/post', isAuth, [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')
        .trim()
        .isLength({ min: 5 })
], postsController.createPost);

// (PUT)/feed/post
router.put('/post/:postId', isAuth, [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')
        .trim()
        .isLength({ min: 5 })
], postsController.editPost);

// (DELETE)/feed/post
router.delete('/post/:postId', isAuth, postsController.deletePost);

module.exports = router;