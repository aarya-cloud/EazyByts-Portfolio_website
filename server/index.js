require('dotenv').config();
const secret = process.env.JWT_SECRET;
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static files (for image uploads, etc.)
app.use('/uploads', express.static('uploads'));

// ✅ Routes
const projectRoutes = require('./routes/projectRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const auth = require('./middleware/authMiddleware');

// ✅ Public Routes
app.use('/api/about', aboutRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

// ✅ Protected Routes (require token)
app.use('/api/projects', projectRoutes);


// ✅ Default Home Route
app.get('/', (req, res) => {
  res.send('🌐 Portfolio CMS Backend Running!');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
