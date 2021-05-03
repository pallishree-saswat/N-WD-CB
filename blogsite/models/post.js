const mongoose = require('mongoose');
const Review = require('./review');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    img: {
        type: String,
    },
      desc: {
        type: String
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;