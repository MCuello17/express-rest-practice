const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator/check');
const Post = require('../models/post');


exports.getPosts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;

    Post.count()
        .then(numProducts => {
            totalItems = numProducts;
            return Post.findAll({
                limit: perPage,
                offset: ((currentPage-1) * perPage)
            });
        })
        .then(posts => {
            posts = posts.map(post => {
                post = post.toJSON();
                post = { ...post, creator: {name: "Test User"}};
                return post;
            });
            res.status(200).json({
                message: 'Posts fetched',
                posts: posts,
                totalItems: totalItems,
            });
        })
        .catch(err => {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        });
}

exports.createPost = (req, res, next) => {
    const { title, content } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, data incorrect!");
        error.statusCode = 422;
        throw error;
    }

    if (!req.file) {
        const error = new Error("No image provided");
        error.statusCode = 422;
        throw error;
    }

    const imageUrl = req.file.path;

    Post.create({
        title: title,
        content: content,
        imageUrl: imageUrl
    })
    .then(post => {
        post = post.toJSON();
        post = { ...post, creator: {name: "Test User"}};
        res.status(201).json({
            message: "Post Created Successfully",
            post: post
        });
    })
    .catch(err => {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    });
}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;

    Post.findByPk(postId)
        .then(post => {
            if (!post) {
                const error = new Error("Post not found");
                error.statusCode = 404;
                throw error;
            }
            post = post.toJSON();
            post = { ...post, creator: {name: "Test User"}};
            res.status(200).json({
                message: "Post fetched",
                post: post
            })
        })
        .catch(err => {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        })
}

exports.editPost = (req, res, next) => {
    const postId = req.params.postId;
    const { title, content } = req.body;
    let imageUrl = req.body.image;

    if (req.file) {
        imageUrl = req.file.path;
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        const error = new Error("Validation failed, data incorrect!");
        error.statusCode = 422;
        throw error;
    }
    
    if (!imageUrl) {
        console.log("No image provided");
        const error = new Error("No image provided!");
        error.statusCode = 422;
        throw error;
    }

    Post.findByPk(postId)
        .then(post => {
            if (!post) {
                const error = new Error("Post not found");
                error.statusCode = 404;
                throw error;
            }

            if (imageUrl !== post.imageUrl) clearImage(post.imageUrl);

            post.title = title;
            post.content = content;
            post.imageUrl = imageUrl;
            return post.save();
        })
        .then(result => {
            post = result.toJSON();
            post = { ...post, creator: {name: "Test User"}};
            res.status(200).json({
                message: "Post updated!",
                post: post
            })
        })
        .catch(err => {
            console.log(err);
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        })
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;

    Post.findByPk(postId)
        .then(post => {
            if (!post) {
                const error = new Error("Post not found");
                error.statusCode = 404;
                throw error;
            }
            clearImage(post.imageUrl);
            return post.destroy();
        })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Post deleted!"
            });
        })
        .catch(err => {
            console.log(err);
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        })
}

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
}