const Post = require('../models/post');
const createError = require('http-errors');

exports.createPost = (req, res, next) => {
    const { title, caption } = req.body;
    if (!title || !caption || !req.file) {
        return next(createError(400, 'الرجاء إدخال جميع الحقول'));
    }

    let model = new Post({
        photo: req.file.filename,
        title: title,
        caption: caption,
        author: req.user.id
    });

    model.save()
        .then(post => {
            res.json();
        })
        .catch(next);
};

exports.list = (req, res, next) => {

    Post.find()
        .select('title caption photo')
        .sort({ created_at: 'desc' })
        .populate('author', 'name')
        .then(posts => {
            res.json(posts);
        })
        .catch(next);

};

exports.details = (req, res, next) => {
    let postId = req.params.id;
    Post.findById(postId)
    .populate('author', 'name')
    .populate('comments.author', 'name')
    .then(post => {
        if(!post) throw createError(404);
        res.json(post);
    })
    .catch(next)
}