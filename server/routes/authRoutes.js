const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { login } = require('../controllers/authController');

// 🔐 Validation rules for login
const loginValidation = [
  check('email').isEmail().normalizeEmail(),
  check('password').exists()
];

// 🔐 Admin login route
router.post('/login', loginValidation, login);

module.exports = router;
