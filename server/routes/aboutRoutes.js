const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');  // import multer upload middleware
const { createAbout, getAbout, updateAbout } = require('../controllers/aboutController');

// POST route to create an about entry with image upload
router.post('/', upload.single('profileImage'), createAbout);

// If you have update route to update the about info + image
router.put('/:id', upload.single('profileImage'), updateAbout);

router.get('/', getAbout);

module.exports = router;
