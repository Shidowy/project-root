import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (name && email && password) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
          name,
          email,
          password
        });

        if (response.status === 201) {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/dashboard');
        }
      } catch (err: any) {
        if (err.response?.status === 409) {
          setError('Email already exists');
        } else {
          setError('Failed to create account. Please try again.');
        }
        console.error('Signup error:', err);
      }
    } else {
      setError('Please fill out all fields.');
    }
  };

  return (
    <section className="signup-section">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
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
