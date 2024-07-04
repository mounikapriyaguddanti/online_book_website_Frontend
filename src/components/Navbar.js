import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-navy py-4 px-8 fixed w-full z-10 top-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://i0.wp.com/www.thebookhive.co.uk/wp-content/uploads/2018/05/cropped-bookhive_logo_large.png?fit=156%2C110&ssl=1"
            alt="Logo"
            className="h-12 mr-4"
          />
          <span className="text-yellow-500 font-bold text-4xl tracking-widest transform hover:scale-105 transition-transform duration-300" style={{ fontFamily: 'Brush Script MT, cursive' }}>
            Book Hive
          </span>
        </div>
        <div className="hidden md:flex">
          <ul className="flex space-x-8 text-white text-lg">
            <li><Link to="/" className="hover:text-orangered">Home</Link></li>
            <li><Link to="#about" className="hover:text-orangered">About</Link></li>
            <li><Link to="/" className="hover:text-orangered">New arrivals</Link></li>
            <li><Link to="/" className="hover:text-orangered">Featured authors</Link></li>
            <li><Link to="/feedback" className="hover:text-orangered">Feedback</Link></li>
            <li><Link to="/" className="hover:text-orangered">Contact</Link></li>
          </ul>
        </div>
        <div className="hidden md:block">
          <Link to="/login" className="bg-orangered hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
        </div>
        <div className="md:hidden">
          <button
            className="text-white hover:text-orangered focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/locations" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Locations</Link>
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Accommodations</Link>
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Packages</Link>
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Travel Connections</Link>
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            <Link to="/login" className="bg-orangered hover:bg-orange-600 text-white font-bold py-2 px-4 rounded block">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
