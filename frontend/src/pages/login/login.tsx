import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (email && password) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          email,
          password
        });

        if (response.status === 200) {
          // Save user data to localStorage
          localStorage.setItem('user', JSON.stringify(response.data));
          // Redirect to dashboard
          navigate('/dashboard');
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError('Invalid email or password');
        } else {
          setError('Login failed. Please try again.');
        }
        console.error('Login error:', err);
      }
    } else {
      setError('Please fill out all fields.');
    }
  };

  return (
    <section className="login-section">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </section>
  );
}

export default Login;
