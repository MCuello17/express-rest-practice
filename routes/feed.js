const express = require('express');
const { body } = require('express-validator/check');

const postsController = require('../controllers/posts')

const router = express.Router();

// (GET)/feed/posts
router.get('/posts', postsController.getPosts);

// (GET)/feed/post
router.get('/post/:postId', postsController.getPost);

// (POST)/feed/posts
router.post('/post', [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')
        .trim()
        .isLength({ min: 5 })
], postsController.createPost);

// (PUT)/feed/post
router.put('/post/:postId', [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')
        .trim()
        .isLength({ min: 5 })
], postsController.editPost);

// (DELETE)/feed/post
router.delete('/post/:postId', postsController.deletePost);

module.exports = router;