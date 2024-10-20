import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // State for email
  const [password, setPassword] = useState<string>(''); // State for password
  const [error, setError] = useState<string>(''); // State for error message
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    // Simulate a simple login process (replace this with actual logic)
    if (email === 'test@example.com' && password === 'password') {
      navigate('/dashboard'); // Navigate on successful login
    } else {
      setError('Invalid email or password.'); // Set error message
    }
  };

  return (
    <section className="login-section">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
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
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </section>
  );
};

export default Login;
