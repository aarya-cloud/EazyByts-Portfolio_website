import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { colorSchemes, colorScheme } = useContext(ThemeContext);

  
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      if (token) setIsAdmin(true);

      try {
        const response = await fetch('https://eazybyts-portfolio-website.onrender.com/api/projects', {
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` }),
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch projects');
        }

        setProjects(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="text-red-500">
          Error: {error}
          <div className="mt-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className={`text-4xl font-bold mb-6 text-center ${colorSchemes[colorScheme].text}`}>My Projects</h1>
      
      {projects.length > 0 ? (
        <div className="grid hi:grid-cols-2 gap-6">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} isAdmin={isAdmin} />
          ))}
        </div>
      ) : (
        <p className="text-center">No projects found.</p>
      )}
    </>
  );
};

const ProjectCard = ({ project, isAdmin }) => (
  <div className="p-4 bg-white rounded shadow hover:shadow-md transition">
    <h2 className="text-2xl text-gray-900 font-semibold">{project.title}</h2>
    <p className="text-xl text-gray-700 my-2">{project.description}</p>
    {project.techStack?.length > 0 && (
      <p className="text-xl text-blue-500">
        Tech: {project.techStack.join(', ')}
      </p>
    )}
    <div className="text-xl mt-2 flex gap-4">
      {project.liveLink && (
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          Live Demo
        </a>
      )}
      {project.githubLink && (
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:underline"
        >
          GitHub
        </a>
      )}
    </div>
  </div>
);

export default Projects;
