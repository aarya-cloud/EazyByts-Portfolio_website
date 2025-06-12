const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  liveLink: String,
  githubLink: String,
  techStack: [String], // array of technologies
  image: String // optional image URL
});

module.exports = mongoose.model('Project', ProjectSchema);
