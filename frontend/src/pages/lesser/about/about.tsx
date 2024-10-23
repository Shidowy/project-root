import React from 'react';
import './about.css';
import NavBar from '../../../components/ui/NavBar';
import Footer from '../../../components/ui/Footer';

const About: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="about-section">
        <h2>Securing Your Digital Presence With Us</h2>
        <p>
          At Mediasured, we provide top-notch cybersecurity solutions tailored to your unique needs. 
          Our mission is to safeguard your digital assets and ensure your business thrives in a secure environment.
        </p>
        <p>
          With a team of industry-leading experts and cutting-edge technology, we deliver comprehensive services 
          that protect against modern cyber threats. Whether you're a small startup or a large corporation, we are
          here to protect your business 24/7.
        </p>
      </div>
      <Footer /> {/* Ensure Footer is included at the bottom */}
    </div>
  );
};

export default About;
