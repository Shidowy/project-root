import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import './App.css';
import SocialMediaDashboard from './pages/dashboard/dashboard';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import About from './pages/lesser/about/about';
import Pricing from './pages/lesser/pricing/pricing';
import Contact from './pages/lesser/contact/contact';
// import Hero from './pages/Home/hero';

function App() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then(response => response.text())
      .then(setMessage);
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
          {message 
            ? message 
            : 'Currently loading the necessary content. Please wait while we retrieve the data...'}
        </div>
      </div>
    </Router>
  );
}

export default App;
