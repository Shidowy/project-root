import React from 'react';
import Hero from './hero';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Hero />
      <h1>Welcome to Our Project</h1>
      <p>This is the home page of our TypeScript React project.</p>
    </div>
  );
};

export default Home;