import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ContactAdmin = ({ token }) => {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    linkedIn: '',
    github: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { colorSchemes, colorScheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchContactInfo = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://eazybyts-portfolio-website.onrender.com/api/contact', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Fetched Contact Info:', response.data);
        setContactInfo(response.data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        } else {
          setMessage('Failed to load contact information');
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchContactInfo();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.put('https://eazybyts-portfolio-website.onrender.com/api/contact', contactInfo, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error saving contact info:', error);
      setMessage('Failed to save contact information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Contact Information</h2>
      
      {loading && <div className="mb-4 text-blue-600">Loading...</div>}
      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactInfo.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactInfo.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            required
          />
        </div>

        <div>
          <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn URL
          </label>
          <input
            type="url"
            id="linkedIn"
            name="linkedIn"
            value={contactInfo.linkedIn}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        <div>
          <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
            GitHub URL
          </label>
          <input
            type="url"
            id="github"
            name="github"
            value={contactInfo.github}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${colorSchemes[colorScheme].primary} ${colorSchemes[colorScheme].hover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactAdmin;
