const express = require('express');
const router = express.Router();
const db = require('../db');
const { getPublicUrl } = require('../aws-s3');


// show gallery (images stored in DB table `media` with s3_key)
router.get('/', async (req, res) => {
try {
const [rows] = await db.query('SELECT id, title, s3_key, created_at FROM media ORDER BY created_at DESC');
// map to public URLs
const items = rows.map(r => ({ ...r, url: getPublicUrl(r.s3_key) }));
res.render('gallery', { title: 'Gallery', items });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


module.exports = router;
