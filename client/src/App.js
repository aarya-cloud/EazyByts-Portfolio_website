import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import ProjectAdmin from './components/ProjectAdmin';
import ContactAdmin from './components/ContactAdmin';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
   <ThemeProvider>
   <navbar />
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout token={token} setToken={setToken} />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<Layout token={token} setToken={setToken} adminLayout />}>
          <Route 
            path="/admin/projects" 
            element={
              <ProtectedRoute>
                <ProjectAdmin token={token} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/contacts" 
            element={
              <ProtectedRoute>
                <ContactAdmin token={token} />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Login Route */}
        <Route 
          path="/login" 
          element={
            token ? <Navigate to="/admin/projects" replace /> : <Login setToken={setToken} />
          } 
        />
      </Routes>
    </Router>
   </ThemeProvider>
  );
}

export default App;