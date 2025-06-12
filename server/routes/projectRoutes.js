const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');

// ✅ Public route to get all projects
router.get('/', getProjects);

// ✅ Protected routes to create, update, delete projects
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
