import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  console.log('Rendering Navbar');
  return (
    <header className="navbar">
      <div className="navbar-logo">MEDIASURED</div>
      <nav>
        <ul className="navbar-middle-links">
          <li><a href="#about">About</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
          <li> 
            <Link to='/login' className="quote-button">
              Get a Quote
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
