// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme || 'light';
  });

  const [colorScheme, setColorScheme] = useState(() => {
    const savedScheme = localStorage.getItem('portfolio-color-scheme');
    return savedScheme || 'blue';
  });

  const colorSchemes = {
    blue: {
      primary: 'bg-blue-600',
      text: 'text-blue-600',
      border: 'border-blue-600',
      hover: 'hover:bg-blue-700'
    },
    green: {
      primary: 'bg-green-600',
      text: 'text-green-600',
      border: 'border-green-600',
      hover: 'hover:bg-green-700'
    },
    pink: {
      primary: 'bg-pink-600',
      text: 'text-pink-600',
      border: 'border-pink-600',
      hover: 'hover:bg-pink-700'
    }
  };

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-color-scheme', colorScheme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme, colorScheme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const changeColorScheme = (scheme) => {
    setColorScheme(scheme);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme,
      colorScheme,
      colorSchemes,
      changeColorScheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};