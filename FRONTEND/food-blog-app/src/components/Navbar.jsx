import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // 2. Initialize the navigate function

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout(); // Call the logout function from context
    closeMobileMenu();
    navigate('/login'); // 3. Navigate to login page AFTER logging out
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to="/" className='navbar-logo' onClick={closeMobileMenu}>
          Recipe<span className='logo-highlight'>fy</span>
        </Link>

        <div className='menu-icon' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className={`bar ${isMobileMenuOpen ? 'animate' : ''}`}></div>
          <div className={`bar ${isMobileMenuOpen ? 'animate' : ''}`}></div>
          <div className={`bar ${isMobileMenuOpen ? 'animate' : ''}`}></div>
        </div>

        <ul className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <NavLink to="/" className='nav-link' onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          {user && (
            <>
              <li className='nav-item'>
                <NavLink to="/myRecipe" className='nav-link' onClick={closeMobileMenu}>
                  My Recipes
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to="/favourites" className='nav-link' onClick={closeMobileMenu}>
                  Favourites
                </NavLink>
              </li>
               <li className='nav-item'>
                <NavLink to="/addRecipe" className='nav-link' onClick={closeMobileMenu}>
                  Add Recipe
                </NavLink>
              </li>
            </>
          )}
          <li className='nav-item user-actions'>
            {user ? (
              // 4. Update the button's onClick handler
              <button onClick={handleLogout} className="nav-link-button">
                Logout
              </button>
            ) : (
              <Link to="/login" className='nav-link-button' onClick={closeMobileMenu}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}