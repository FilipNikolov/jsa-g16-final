const mongoose = require('mongoose');

const Account = mongoose.model(
    'accounts',
    {
        email: String,
        password: String,
        full_name: String
    },
    'accounts'
);

const create = async (acc) => {
    let a = new Account(acc);
    return await a.save();
};

const getByID = async (id) => {
    return await Account.findOne({_id: id});
};

const getByEmail = async (email) => {
    return await Account.findOne({ email });
};

const getAll = async () => {
    return await Account.find({});
};

const update = async (id, acc) => {
    return await Account.updateOne({_id: id}, acc);
};

const remove = async (id, acc) => {
    return await Account.deleteOne({ _id: id });
};

module.exports = {
    create,
    getByID,
    getByEmail,
    getAll,
    update,
    remove
};
