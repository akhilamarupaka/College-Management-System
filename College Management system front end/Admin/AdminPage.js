import React, { useEffect, useState } from 'react';
import './AdminPage.css';
import { Link } from 'react-router-dom';

function AdminPage() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
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
  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage when Logout is clicked
  };
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
            <Link to="/AdminLandingPage" className="nav-link">Home</Link>
          </li>

          <li className="nav-item">
            <Link to="/AdminChat" className="nav-link">Chat</Link>
          </li>
          <li className="nav-item">
            <Link to="/AdminProfile" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <a href="https://vxg7897.uta.cloud/home/" className="nav-link">Forums</a>
          </li>
          <li className="nav-item">
            <Link to="/LandingPage" onclick={handleLogout} className="nav-link">Logout</Link>
          </li>

        </ul>
      </nav>
    </header>
  );
}

export default AdminPage;
