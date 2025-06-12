import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ChevronDownIcon, PaintBrushIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Layout = ({ showAdminLinks, token, setToken }) => {
  // Theme state management
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'light');
  const [colorScheme, setColorScheme] = useState(() => localStorage.getItem('portfolio-color-scheme') || 'blue');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Color schemes configuration
  const colorSchemes = {
    blue: { 
      primary: 'bg-blue-500',
      secondary: 'bg-blue-400',
      text: 'text-blue-500',
      border: 'border-blue-500',
      hover: 'hover:bg-blue-600',
      button: 'bg-blue-500 hover:bg-blue-600 text-white'
    },
    green: { 
      primary: 'bg-green-600',
      secondary: 'bg-green-500',
      text: 'text-green-600',
      border: 'border-green-600',
      hover: 'hover:bg-green-700',
      button: 'bg-green-600 hover:bg-green-700 text-white'
    },
    pink: { 
      primary: 'bg-pink-400',
      secondary: 'bg-pink-300',
      text: 'text-pink-400',
      border: 'border-pink-400',
      hover: 'hover:bg-pink-500',
      button: 'bg-pink-400 hover:bg-pink-500 text-white'
    }
  };

  // Check login status
  const isLoggedIn = !!token;

  // Initialize token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, [setToken]);

  // Persist theme settings
  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-color-scheme', colorScheme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme, colorScheme]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowThemeDropdown(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Toggle theme dropdown
  const toggleThemeDropdown = (e) => {
    e.stopPropagation();
    setShowThemeDropdown(!showThemeDropdown);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/';
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className={`min-h-screen transition-colors duration-300 
        ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>

        {/* Header/Navbar */}
        <header className={`${colorSchemes[colorScheme].primary} text-white p-4 shadow-md`}>
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold">My Portfolio</Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-8 h-8" />
              ) : (
                <Bars3Icon className="w-8 h-8" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {!isLoggedIn ? (
                <>
                  <NavLink to="/" colorScheme={colorScheme} theme={theme}>Home</NavLink>
                  <NavLink to="/about" colorScheme={colorScheme} theme={theme}>About</NavLink>
                  <NavLink to="/projects" colorScheme={colorScheme} theme={theme}>Projects</NavLink>
                  <NavLink to="/blog" colorScheme={colorScheme} theme={theme}>Blog</NavLink>
                  <NavLink to="/contact" colorScheme={colorScheme} theme={theme}>Contact</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/admin/projects" colorScheme={colorScheme} theme={theme}>Projects</NavLink>
                  <NavLink to="/admin/contacts" colorScheme={colorScheme} theme={theme}>Contacts</NavLink>
                </>
              )}

              {/* Theme Dropdown */}
              <div className="relative ml-4">
                <button
                  onClick={toggleThemeDropdown}
                  className="flex items-center gap-1 px-3 py-2 rounded hover:bg-opacity-20 hover:bg-white transition"
                  aria-label="Theme settings"
                >
                  <PaintBrushIcon className="h-5 w-5" />
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                {showThemeDropdown && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 ${
                      theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-2">
                      <div className="flex justify-between items-center mb-2">
                        <span>Dark Mode</span>
                        <button
                          onClick={toggleTheme}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            theme === 'dark' ? colorSchemes[colorScheme].primary : 'bg-gray-200'
                          }`}
                          aria-label="Toggle dark mode"
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      <div>
                        <span className="block mb-1">Color Scheme</span>
                        <div className="flex space-x-2">
                          {Object.keys(colorSchemes).map(color => (
                            <button
                              key={color}
                              onClick={() => setColorScheme(color)}
                              className={`h-6 w-6 rounded-full ${colorSchemes[color].primary} ${
                                colorScheme === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                              }`}
                              aria-label={`${color} theme`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Login/Logout Button */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className={`ml-4 px-4 py-2 rounded ${colorSchemes[colorScheme].hover} bg-red-600 text-white`}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`ml-4 px-4 py-2 rounded ${colorSchemes[colorScheme].button}`}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 flex flex-col items-center">
              {!isLoggedIn ? (
                <>
                  <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
                  <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
                  <MobileNavLink to="/projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</MobileNavLink>
                  <MobileNavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</MobileNavLink>
                  <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>
                </>
              ) : (
                <>
                  <MobileNavLink to="/admin/projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</MobileNavLink>
                  <MobileNavLink to="/admin/contacts" onClick={() => setIsMobileMenuOpen(false)}>Contacts</MobileNavLink>
                </>
              )}

              {/* Mobile Theme Dropdown */}
              <div className="w-full px-4 pt-4">
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span>Dark Mode</span>
                    <button
                      onClick={toggleTheme}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        theme === 'dark' ? colorSchemes[colorScheme].primary : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="mb-3">
                    <span className="block mb-2">Color Scheme</span>
                    <div className="flex justify-center space-x-3">
                      {Object.keys(colorSchemes).map(color => (
                        <button
                          key={color}
                          onClick={() => setColorScheme(color)}
                          className={`h-8 w-8 rounded-full ${colorSchemes[color].primary} ${
                            colorScheme === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Login/Logout Button */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full mx-4 px-4 py-2 rounded ${colorSchemes[colorScheme].hover} bg-red-600 text-white`}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full mx-4 px-4 py-2 rounded text-center ${colorSchemes[colorScheme].button}`}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>

        {/* Admin Floating Menu */}
        {showAdminLinks && isLoggedIn && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              className={`p-4 rounded-full shadow-lg ${colorSchemes[colorScheme].primary} text-white hover:shadow-xl transition-transform hover:scale-105`}
              onClick={() => setShowAdminMenu(prev => !prev)}
              aria-label="Admin menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>

            {showAdminMenu && (
              <div className={`mt-2 rounded-lg shadow-xl overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                <Link 
                  to="/admin/projects" 
                  className={`block px-4 py-3 ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Manage Projects
                </Link>
                <Link 
                  to="/admin/contacts" 
                  className={`block px-4 py-3 ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Manage Contacts
                </Link>
                <button
                  onClick={handleLogout}
                  className={`block w-full text-left px-4 py-3 ${
                    theme === 'dark' ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'
                  }`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable NavLink component
const NavLink = ({ to, children, colorScheme, theme }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-md text-sm font-medium ${
      theme === 'dark' 
        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
    }`}
  >
    {children}
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="w-full text-center px-4 py-2 text-lg hover:bg-opacity-10 hover:bg-white rounded"
  >
    {children}
  </Link>
);

export default Layout;