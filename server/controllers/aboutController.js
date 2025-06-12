const About = require('../models/About');  // Your about model

// Create about
exports.createAbout = async (req, res) => {
  try {
    const data = req.body;
    
    // Add the image path if file uploaded
    if (req.file) {
      data.profileImage = `/uploads/${req.file.filename}`;  // or wherever you serve static files from
    }

    const about = new About(data);
    await about.save();
    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAbout = async (req, res) => {
  const about = await About.find();
  res.json(about);
};

// Update about
exports.updateAbout = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedAbout = await About.findByIdAndUpdate(req.params.id, data, { new: true });

    if (!updatedAbout) {
      return res.status(404).json({ message: 'About entry not found' });
    }

    res.json(updatedAbout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
