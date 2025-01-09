import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spendrlogo from '../assets/Spendr.jpg'; // Import the logo
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/AuthSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State to toggle mobile menu
  // const isAuthenticated = false ;
  const logoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser()); // Dispatch logout
    navigate('/'); // Redirect to the landing page after logout
  };

  return (
    <nav className="navbar bg-white p-4 shadow sticky top-0 z-10 border border-gray-300 h-[60px] md:h-[80px] flex items-center">
      <div className="flex justify-between items-center w-full">

        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <img src={Spendrlogo} alt="Spendr Logo" className="h-8 md:h-10 rounded-lg" />
          <span className="text-lg font-bold">Spendr</span>
        </div>

        {/* Navigation Links (for Large Screens) */}
        <div className="hidden md:flex space-x-6 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/" className="text-green-500">Home</Link>
              <Link to="/dashboard" className="text-green-500">Dashboard</Link>
              <Link to="/common-rooms" className="text-green-500">Common Rooms</Link>
              <Link to="/contact-us" className="text-green-500">Contact Us</Link>
              <Link to="/about-us" className="text-green-500">About</Link>
              <Link to="/history" className="text-green-500">History</Link>
              <button
                className="text-white bg-black px-4 py-2 rounded-lg"
                onClick={logoutClick}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="text-green-500">Home</Link>
              <Link to="/contact-us" className="text-green-500">Contact Us</Link>
              <Link to="/about-us" className="text-green-500">About</Link>
              <button
                className="text-white bg-black px-4 py-2 rounded-lg"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="text-white bg-black px-4 py-2 rounded-lg"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Hamburger Menu (for Small Screens) */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            className="absolute top-[60px] right-0 bg-white shadow-lg border border-gray-300 rounded-lg p-4 w-48 z-20 md:hidden"
          >
            {isAuthenticated ? (
              <>
                <Link to="/" className="block py-2 px-4 text-green-500">Home</Link>
                <Link to="/dashboard" className="block py-2 px-4 text-green-500">Dashboard</Link>
                <Link to="/common-rooms" className="block py-2 px-4 text-green-500">Common Rooms</Link>
                <Link to="/contact-us" className="block py-2 px-4 text-green-500">Contact Us</Link>
                <Link to="/about-us" className="block py-2 px-4 text-green-500">About</Link>
                <Link to="/history" className="block py-2 px-4 text-green-500">History</Link>
                <button
                  className="block w-full py-2 px-4 text-white bg-black rounded-lg"
                  onClick={logoutClick}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="block py-2 px-4 text-green-500">Home</Link>
                <Link to="/contact-us" className="block py-2 px-4 text-green-500">Contact Us</Link>
                <Link to="/about-us" className="block py-2 px-4 text-green-500">About</Link>
                <button
                  className="block w-full py-2 px-4 text-white bg-black rounded-lg"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
                <button
                  className="block w-full py-2 px-4 text-white bg-black rounded-lg"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
