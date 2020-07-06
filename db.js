require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});

const postSchema = new mongoose.Schema({
    title: String,
    link: String,
    content: String,
    truncated: String
});

const PostModel = mongoose.model('Post', postSchema);

module.exports.PostModel = PostModel;