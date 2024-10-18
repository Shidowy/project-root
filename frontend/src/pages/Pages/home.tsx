import React from 'react';
import Hero from './hero';
import ProductServices from './ProductServices';
import SectionOne from './SectionOne';
import CTA from './CTA';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Hero />
      <ProductServices />
      <SectionOne />
      <CTA />
    </div>
  );
};

export default Home;