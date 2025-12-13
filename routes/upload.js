const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // memory storage
const { uploadBufferToS3 } = require('../aws-s3');
const db = require('../db');
const { v4: uuidv4 } = require('uuid');


router.get('/', (req, res) => {
res.render('upload', { title: 'Upload' });
});


router.post('/', upload.single('image'), async (req, res) => {
try {
if (!req.file) return res.status(400).send('No file uploaded');
const file = req.file;
const ext = (file.originalname.match(/\.[^.]+$/) || [''])[0];
const key = `${process.env.S3_STATIC_PREFIX || 'static'}/${uuidv4()}${ext}`;
const result = await uploadBufferToS3(file.buffer, key, file.mimetype);


// store metadata in DB
await db.query('INSERT INTO media (title, s3_key, mime_type, created_at) VALUES (?, ?, ?, NOW())', [req.body.title || file.originalname, key, file.mimetype]);


res.redirect('/gallery');
} catch (err) {
console.error(err);
res.status(500).send('Upload failed');
}
});


module.exports = router;
