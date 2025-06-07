import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white mb-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Brand */}
          <Link to="/" className="text-xl font-bold text-white hover:text-gray-300">
            Blogify
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col space-y-1 p-2"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-4">
              {currentUser ? (
                <>
                  <Link to="/blogs" className="text-white hover:text-gray-300">
                    All Blogs
                  </Link>
                  <Link to="/my-blogs" className="text-white hover:text-gray-300">
                    My Blogs
                  </Link>
                  <Link to="/create-blog" className="text-white hover:text-gray-300">
                    Create Blog
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-gray-300">
                    Login
                  </Link>
                  <Link to="/signup" className="text-white hover:text-gray-300">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* User info and logout */}
            {currentUser && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">
                  Signed in as: <span className="text-white">{currentUser.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="border border-white text-white px-3 py-1 rounded hover:bg-white hover:text-gray-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <div className="pb-4 space-y-2">
            {currentUser ? (
              <>
                <Link
                  to="/blogs"
                  className="block text-white hover:text-gray-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Blogs
                </Link>
                <Link
                  to="/my-blogs"
                  className="block text-white hover:text-gray-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Blogs
                </Link>
                <Link
                  to="/create-blog"
                  className="block text-white hover:text-gray-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Blog
                </Link>
                <div className="pt-2 border-t border-gray-600">
                  <span className="block text-gray-300 py-2">
                    Signed in as: <span className="text-white">{currentUser.name}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="border border-white text-white px-3 py-1 rounded hover:bg-white hover:text-gray-800 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-white hover:text-gray-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-white hover:text-gray-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
