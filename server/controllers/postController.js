const Post = require('../models/post');
const createError = require('http-errors');

exports.createPost = (req, res, next) => {
    const { title, caption } = req.body;
    if (!title || !caption || !req.file) {
        return next(createError(400, 'الرجاء إدخال جميع الحقول'));
    }
    console.log(req.file);

    let model = new Post({
        photo: req.file.filename,
        title: title,
        caption: caption,
        author: req.user.id
    });


    console.log(model);
    model.save()
        .then(post => {
            res.json();
        })
        .catch((err) => {
            console.log(err);
        });
};