const express = require('express');

const postsController = require('../controllers/posts')

const router = express.Router();

// (GET)/feed/posts
router.get('/posts', postsController.getPosts);

// (POST)/feed/posts
router.post('/post', postsController.createPost);

module.exports = router;