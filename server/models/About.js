const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // should be a URL
    required: false,
  }
});

module.exports = mongoose.model('About', AboutSchema);
