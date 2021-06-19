const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const PostSchema = new Schema({
    photo: String,
    title: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        CommentSchema
    ],
    likes: {
        type: Number,
        default: 0,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;