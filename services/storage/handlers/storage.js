const fs = require('fs');
const strings = require('../../../pkg/strings');

const MAX_FILESIZE = 1048576; // 1024 * 1024 = 1mb
const ALLOWED_FILETYPES = ['image/jpeg', 'image/png', 'image/pjpeg', 'image/gif'];

const upload = async (req, res) => {
    if (MAX_FILESIZE < req.files.document.size) {
        return res.status(400).send('File exceeds max file size');
    }
    if (!ALLOWED_FILETYPES.includes(req.files.document.mimetype)) {
        return res.status(400).send('Filetype not allowed');
    }
    let userDir = `user_${req.user.id}`;
    let userDirPath = `${__dirname}/../uploads/${userDir}`;
    if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }
    let fileName = `${strings.makeID(6)}_${req.files.document.name}`; // 872hd8_imenafajl.png
    let filePath = `${userDirPath}/${fileName}`;
    req.files.document.mv(filePath, err => {
        if (err) {
            return res.status(500).send('Internal server error');
        }
        res.status(201).send({ file_name: fileName });
    });
};

const download = async (req, res) => {
    let userDir = `user_${req.user.id}`;
    let userDirPath = `${__dirname}/../../uploads${userDir}`;
    let filePath = `${userDirPath}/${req.params.filename}`;
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not foud');
    }
    res.download(filePath);
};
const removeFile = async (req, res) => {
    let userDir = `user_${req.user.id}`;
    let userDirPath = `${__dirname}/../uploads/${userDir}`;
    let filePath = `${userDirPath}/${req.params.filename}`;
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found!')
    };
    try {
        fs.unlinkSync(filePath);
        return res.status(200).send("Succsesfully Deleted!")
    } catch (err) {
        return res.status(500).send(err)
    }
};
const listFiles = async (req, res) => {
    let userDir = `user_${req.user.id}`;
    let userDirPath = `${__dirname}/../uploads/${userDir}`;
    let files = [];
    try {
        fs.readdirSync(userDirPath).forEach(file => {
            files.push(file);
        });
        return res.status(200).send(files);

    } catch (err) {
        return res.status(500).send(err);
    }
};
module.exports = {
    upload,
    download,
    removeFile,
    listFiles
};