exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {title: "First Post", body: "This is the first post!"},
        ]
    });
}

exports.createPost = (req, res, next) => {
    const { title, body } = req.body;
    // Create post in db
    res.status(201).json({
        message: 'Post Created successfully!',
        post: {
            id: new Date().toISOString(),
            title: title,
            body: body,
        }
    })
}