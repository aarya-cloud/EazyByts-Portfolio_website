import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const HomePage = () => {
  const { theme, colorSchemes, colorScheme } = useContext(ThemeContext);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] gap-12 p-8">
      {/* Profile Photo */}
      <div className={`w-64 h-64 rounded-full overflow-hidden border-4 ${theme === 'dark' ? 'border-gray-700' : 'border-white'} shadow-xl`}>
        <img
          src="/images/profile.png"
          alt="Aarya Patankar"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>


          {/* Introduction Text */}
          <div className="text-center md:text-left">
            <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${colorSchemes[colorScheme].text}`}>
              Hi, I'm Aarya Patankar
            </h1>
            <h2 className={`text-2xl md:text-3xl font-semibold mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Full Stack Developer
        </h2>
            
            
            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link 
                to="/about" 
                className={`px-6 py-3 rounded-lg ${colorSchemes[colorScheme].primary} text-white ${colorSchemes[colorScheme].hover} transition`}
              >
                About Me
              </Link>
              <Link 
                to="/projects" 
                className={`px-6 py-3 rounded-lg border ${colorSchemes[colorScheme].border} ${theme === 'dark' ? 'text-white' : colorSchemes[colorScheme].text} hover:bg-opacity-10 ${theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-200'} transition`}
              >
                View Projects
              </Link>
            </div>
          </div>
    </div>
  );
};

export default HomePage;