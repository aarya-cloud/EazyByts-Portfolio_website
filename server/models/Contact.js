const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  linkedIn: { type: String, required: false },
  github: { type: String, required: false }
});

module.exports = mongoose.model('Contact', ContactSchema);
