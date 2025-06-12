import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const BlogSection = ({ token }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { colorSchemes, colorScheme } = useContext(ThemeContext);

  const isAdmin = !!token; // Check if user is admin

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://eazybyts-portfolio-website.onrender.com/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`https://eazybyts-portfolio-website.onrender.com/api/blogs/${editingId}`, newBlog, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('https://eazybyts-portfolio-website.onrender.com/api/blogs', newBlog, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      const response = await axios.get('https://eazybyts-portfolio-website.onrender.com/api/blogs');
      setBlogs(response.data);
      setNewBlog({ title: '', content: '', author: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving blog:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://eazybyts-portfolio-website.onrender.com/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const response = await axios.get('https://eazybyts-portfolio-website.onrender.com/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEdit = (blog) => {
    setNewBlog({
      title: blog.title,
      content: blog.content,
      author: blog.author
    });
    setEditingId(blog._id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className={`text-4xl text-center font-bold mb-8 ${colorSchemes[colorScheme].text}`}>My Blogs</h1>
      
      {/* Display Existing Blogs */}
      {blogs.map(blog => (
        <div key={blog._id} className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl text-gray-800 font-semibold mb-2">{blog.title}</h2>
          <p className="text-gray-700 mb-4">{blog.content}</p>
          <p className="text-gray-600">~ {blog.author}</p>
          
          {/* Only show edit/delete if admin */}
          {isAdmin && (
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => handleEdit(blog)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(blog._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Add/Edit Blog Form (only for admin) */}
      {isAdmin && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">
            {editingId ? 'Edit Blog' : 'Add Blog'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Content</label>
              <textarea
                name="content"
                value={newBlog.content}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Author</label>
              <input
                type="text"
                name="author"
                value={newBlog.author}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-green-600 text-white rounded ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? 'Processing...' : editingId ? 'Update Blog' : 'Add Blog'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setNewBlog({ title: '', content: '', author: '' });
                  setEditingId(null);
                }}
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogSection;