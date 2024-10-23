import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/NavBar.css';

const NavBar: React.FC = () => {
  console.log('Rendering Navbar');
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">MEDIASURED</Link>
      <nav>
        <ul className="navbar-middle-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/contact">Contact</Link></li>
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
