import React, { useEffect, useState } from 'react';
import './Login_Nav.css';
import { Link } from 'react-router-dom';

function Login_Nav() {
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
            <Link to="/LandingPage" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/Programs" className="nav-link">Programs</Link>
          </li>
          <li className="nav-item">
            <Link to="/ContactUs" className="nav-link">Contact Us</Link>
          </li>
      
          <li className="nav-item">
            <a href="/Login" className="nav-link">Login</a>
          </li>
          <li className="nav-item">
            <Link to="/SignUp" className="nav-link">Sign Up</Link>
          </li>

        </ul>
      </nav>
    </header>
  );
}

export default Login_Nav;
