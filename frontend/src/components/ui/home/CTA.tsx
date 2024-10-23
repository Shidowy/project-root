import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/home/CTA.css';

const CTA: React.FC = () => {
  return (
    <div className="cta-section">
      <h2>Securing Your Digital Presence With Us.</h2>
      <Link to="/login" className="cta-button">Get Your Quote</Link>
    </div>
  );
};

export default CTA;