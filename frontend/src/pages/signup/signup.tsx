import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './signup.css';

const Signup: React.FC = () => {
  const [name, setName] = useState<string>(''); // State for user's name
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    // For now, simply navigate to the dashboard after form submission
    if (name && email && password) {
      navigate('/dashboard');
    } else {
      setError('Please fill out all fields.'); // Set error message if fields are empty
    }
  };

  return (
    <section className="signup-section">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}

export default Signup;
