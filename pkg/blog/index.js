const mongoose = require('mongoose');

const Posts = mongoose.model(
    'posts',
    {
        user_id: String,
        title: String,
        content: String
    },
    'posts'
);

// id -> post id
// user_id -> user id
// data -> post data {_id, user_id, title, content}

const getAll = async (user_id) => {
    return await Posts.find({ user_id });
    // return await Posts.find({ user_id: user_id });
};

const getSingle = async (user_id, id) => {
    return await Posts.findOne({ user_id, _id: id });
};

const create = async (data) => {
    let p = new Posts(data);
    return await p.save();
};

const update = async (id, data) => {
    return Posts.updateOne({_id: id}, data);
};

const remove = async (id) => {
    return await Posts.deleteOne({_id: id});
};

module.exports = {
    getAll,
    getSingle,
    create,
    update,
    remove
};