import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function ProjectAdmin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    liveLink: "",
    githubLink: "",
  });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { colorSchemes, colorScheme } = useContext(ThemeContext);

  // Fetch projects on load
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not authorized");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not authorized");
      setLoading(false);
      return;
    }

    try {
      if (editingProjectId) {
        await axios.put(`http://localhost:3000/api/projects/${editingProjectId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Project updated successfully.");
      } else {
        await axios.post("http://localhost:3000/api/projects", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Project added successfully.");
      }

      setForm({
        title: "",
        description: "",
        techStack: "",
        liveLink: "",
        githubLink: "",
      });
      setEditingProjectId(null);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      setError("Failed to save project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      liveLink: project.liveLink,
      githubLink: project.githubLink,
    });
    setEditingProjectId(project._id);
    setMessage("");
    setError("");
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not authorized");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
      setMessage("Project deleted successfully");
      setError("");
    } catch (err) {
      setError("Failed to delete project");
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">
        {editingProjectId ? "Edit Project" : "Add New Project"}
      </h2>

      {message && <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">{message}</div>}
      {error && <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma-separated)"
          value={form.techStack}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="url"
          name="liveLink"
          placeholder="Live Link"
          value={form.liveLink}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="url"
          name="githubLink"
          placeholder="GitHub Link"
          value={form.githubLink}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className={`${colorSchemes[colorScheme].primary} text-white p-2 rounded ${colorSchemes[colorScheme].hover}`}
          disabled={loading}
        >
          {loading ? "Saving..." : editingProjectId ? "Update Project" : "Add Project"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Manage Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-4 bg-white rounded shadow hover:shadow-md transition"
          >
            <h4 className="text-2xl text-gray-900 font-bold">{project.title}</h4>
            <p className="text-xl text-gray-900 mb-2">{project.description}</p>
            <p className="mb-2 text-sm text-gray-600">
              Tech Stack: {project.techStack}
            </p>
            <div className="flex space-x-2 mb-2">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Live
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(project)}
                className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectAdmin;
