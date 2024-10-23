import React from 'react';
import Hero from '../../components/ui/home/hero';
import ProductServices from '../../components/ui/home/ProductServices';
import SectionOne from '../../components/ui/home/SectionOne';
import CTA from '../../components/ui/home/CTA';
import NavBar from '../../components/ui/NavBar';
import Footer from '../../components/ui/Footer';
// import SocialMediaDashboard from '../dashboard/dashboard';

const Home: React.FC = () => {
  return (
    <div>
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