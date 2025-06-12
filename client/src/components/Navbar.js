import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ showAdminLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className="bg-blue-600 text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
      {/* Logo and Hamburger */}
      <div className="w-full flex justify-between items-center">
        <div className="font-bold text-xl">Aarya Patankar</div>
        <div className="md:hidden text-3xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✖️' : '☰'}
        </div>
      </div>

      {/* Links */}
      <div className={`${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0`}>
        {!isAdmin && (
          <>
            <Link to="/" className="block md:inline hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="block md:inline hover:underline" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/projects" className="block md:inline hover:underline" onClick={() => setIsOpen(false)}>Projects</Link>
            <Link to="/blog" className="block md:inline hover:underline" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/contact" className="block md:inline hover:underline" onClick={() => setIsOpen(false)}>Contact</Link>
          </>
        )}
        {showAdminLinks && (
          <>
            <Link to="/admin/projects" className="block md:inline hover:underline" onClick={() => setIsOpen(false)}>Project Admin</Link>
            <Link to="/admin/contacts" className="block md:inline hover:underline" onClick={() => setIsOpen(false)}>Contact Admin</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
