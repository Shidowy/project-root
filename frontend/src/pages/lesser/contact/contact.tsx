import React, { useState } from 'react';
import './contact.css';
import NavBar from '../../Home/NavBar';
import Footer from '../../Home/Footer';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      return;
    }

    // Submit the form data (replace this with your API call)
    console.log('Form submitted:', { name, email, message });
    setSuccess(true);
    setError('');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <NavBar />
      <div className="contact-section">
        <h2>Get in Touch</h2>
        <p className="contact-intro">
          We’re here to help you secure your social media presence. If you have any questions or inquiries regarding our services, please feel free to reach out to us. Our team is dedicated to providing you with the information you need to protect your digital assets.
        </p>
        {success && <p className="success-message">Your message has been sent!</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-button">Send Message</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
