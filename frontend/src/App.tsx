// App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import About from './pages/lesser/about/about';
import Contact from './pages/lesser/contact/contact';
import Pricing from './pages/lesser/pricing/pricing';
import Home from './pages/Home/home';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import SocialMediaDashboard from './pages/dashboard/dashboard';

interface BackendResponse {
  message: string;
  status: string;
}

function App() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<BackendResponse>(import.meta.env.VITE_API_URL)
      .then(response => {
        setMessage(response.data.message); // Access the message propertyd
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<SocialMediaDashboard />} />
        </Routes>
        <div>
          <h1>Message from Backend</h1>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && <p>{message}</p>} {/* Display just the message string */}
        </div>
      </div>
    </Router>
  );
}

export default App;
