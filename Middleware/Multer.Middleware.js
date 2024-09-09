// multerConfig.js
const multer = require('multer');
const path = require('path');
const moment = require('moment'); // For date and time formatting

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const timestamp = moment().format('YYYYMMDD_HHmmss');
        const ext = path.extname(file.originalname);
        const filename = `jobdoc_${timestamp}${ext}`;
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Optional: limit file size to 10MB
});

module.exports = upload;
