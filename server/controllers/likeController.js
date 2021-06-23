const Post = require('../models/post');
const createError = require('http-errors');
const mongoose = require('mongoose');

exports.like = (req, res, next) => {
    let data = {
        _id: mongoose.Types.ObjectId(),
        author: req.user.id,
    };

    Post.findById(req.params.postId)
        .then(post => {
            if (!post) throw createError(404);
            post.likes.push(data);
            return post.save();
        })
        .then(post => {
            let like = post.likes.id(data._id);
            res.json(like);
        })
        .catch(next);
}

exports.unlike = (req, res, next) => {
    let userData = {
        _id: mongoose.Types.ObjectId(),
        author: req.user.id
    }
    Post.findById(req.params.postId)
        .then(post => {
            if (!post) throw createError(404);
            for (let index in post.likes) {
                if (post.likes[index].author == userData.author) {
                    post.likes.splice(index, 1);
                    return post.save();
                }
            }
        })
        .then(post => {
            res.json();
        })
        .catch(next);
}
