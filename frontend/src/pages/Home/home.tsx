import React from 'react';
import Hero from './hero';
import ProductServices from './ProductServices';
import SectionOne from './SectionOne';
import CTA from './CTA';
import NavBar from './NavBar';
import Footer from './Footer';
import SocialMediaDashboard from '../dashboard/dashboard';

const Home: React.FC = () => {
  return (
    <div>
      <NavBar/>
      <Hero />
      <ProductServices />
      <SectionOne />
      <CTA />
      <Footer/>
      <SocialMediaDashboard/>
    </div>
  );
};

export default Home;