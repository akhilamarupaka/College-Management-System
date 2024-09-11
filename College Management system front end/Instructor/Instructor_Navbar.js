import React, { useEffect, useState } from 'react';
import './Instructor_Nav.css';
import { Link } from 'react-router-dom';

function Instructor_Navbar() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage when Logout is clicked
  };
  const closeMenu = () => {
    setMenuActive(false);
  };

  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });
    };
  }, []);

  return (
    <header>
      <nav className="navbar">
        <div className={`hamburger ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar-nav"></span>
          <span className="bar-nav"></span>
          <span className="bar-nav"></span>
        </div>
        <ul className={`nav-menu ${menuActive ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/Instructor" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/Instructor_Reports" className="nav-link">Reports</Link>
          </li>
          <li className="nav-item">
            <Link to="/Instructor_chat" className="nav-link">Chat</Link>
          </li>
          <li className="nav-item">
            <Link to="/Instructor_Profile" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <a href="https://vxg7897.uta.cloud/home/" className="nav-link">Forums</a>
          </li>
          <li className="nav-item">
            <Link to="/LandingPage" className="nav-link" onClick={handleLogout}>Logout</Link>
          </li>

        </ul>
      </nav>
    </header>
  );
}

export default Instructor_Navbar;
