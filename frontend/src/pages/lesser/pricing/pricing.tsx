import React from 'react';
import './pricing.css';
import NavBar from '../../../components/ui/NavBar';
import Footer from '../../../components/ui/Footer';

const Pricing: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="pricing-section">
        <h2>Customized Protection for Elite Social Media Influencers</h2>
        <p className="pricing-description">
          Our social media insurance is designed specifically for high-earning influencers. We provide tailored coverage options that scale based on your account's value and income potential. Fill out our form to receive a personalized quote!
        </p>
        <div className="pricing-info">
          <h3>Why Choose Our Insurance?</h3>
          <ul>
            <li>Compensation that reflects your account's income</li>
            <li>Customizable coverage options for your unique needs</li>
            <li>Rapid response and recovery services for all your accounts</li>
            <li>Expert support from our dedicated team</li>
          </ul>
        </div>
        <div className="pricing-cards">
          <PricingCard 
            title="Starter Plan" 
            price="$99.99/month" 
            benefits={[
              "Coverage for 1 Account",
              "Up to $50,000 in Compensation",
              "Account Recovery Assistance",
              "12-Hour Response Time"
            ]}
          />
          <PricingCard 
            title="Growth Plan" 
            price="$199.99/month" 
            benefits={[
              "Coverage for up to 3 Accounts",
              "Up to $150,000 in Compensation",
              "Priority Recovery Support",
              "8-Hour Response Time"
            ]}
          />
          <PricingCard 
            title="Premium Plan" 
            price="Custom Pricing" 
            benefits={[
              "Coverage for Unlimited Accounts",
              "Compensation Based on Total Account Value",
              "Dedicated Account Recovery Team",
              "Immediate 24/7 Support",
              "Customizable Protection Levels"
            ]}
          />
        </div>
        <div className="cta-section">
          <h3>Get Your Personalized Quote</h3>
          <a href="/quote" className="cta-button">Request a Quote</a>
        </div>
        <div className="get-in-touch">
          <h3>Have Questions?</h3>
          <p>
            We're here to help you secure your digital presence! If you have any inquiries or need further assistance,
          </p>
          <a href="/contact" className="cta-button">Get in Touch</a> {/* Moved button here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const PricingCard: React.FC<{ title: string; price: string; benefits: string[] }> = ({ title, price, benefits }) => (
  <div className="pricing-card">
    <h3>{title}</h3>
    <p className="price">{price}</p>
    <ul>
      {benefits.map((benefit, index) => (
        <li key={index}>{benefit}</li>
      ))}
    </ul>
    <a href="/signup" className="cta-button">Get Started</a>
  </div>
);

export default Pricing;
