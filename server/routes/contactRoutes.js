const express = require('express');
const router = express.Router();
const { getContact, updateContact } = require('../controllers/contactController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', getContact);
router.put('/', authenticateToken, updateContact);

module.exports = router;
