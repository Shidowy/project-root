import React from 'react';
import Hero from './hero';
import ProductServices from './ProductServices';
import SectionOne from './SectionOne';
import CTA from './CTA';
import NavBar from './NavBar';
import Footer from './Footer';

const Home: React.FC = () => {
  return (
    <div className="home">
      <NavBar/>
      <Hero />
      <ProductServices />
      <SectionOne />
      <CTA />
      <Footer/>
    </div>
  );
};

export default Home;