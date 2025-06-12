import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const { theme, colorSchemes, colorScheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog", err);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setForm({ title: blog.title, content: blog.content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/blogs/${editingId}`, form);
      } else {
        await axios.post("/api/blogs", form);
      }
      setForm({ title: "", content: "" });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      console.error("Error submitting blog", err);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">📝 Blog Manager</h2>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Blog Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Blog Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editingId ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {/* Blog List */}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 bg-white shadow rounded text-black">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-sm text-gray-600">{new Date(blog.date).toLocaleString()}</p>
            <p className="my-2">{blog.content}</p>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(blog)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
