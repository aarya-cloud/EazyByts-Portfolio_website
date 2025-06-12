const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

router.get('/', getAllBlogs);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
