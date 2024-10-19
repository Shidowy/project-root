import React, { useState } from 'react';
import defaultuser from '../../assets/defaultuser.png';
import './Hero.css';

interface Testimonial {
  quote: string;
  author: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Mediasured got me what I deserved when it came to my social media and digital presence.",
    author: "Wyatt",
    image: defaultuser,
  },
  {
    quote: "A truly excellent service that surpassed all my expectations!",
    author: "Jane",
    image: defaultuser,
  },
  {
    quote: "Professional and reliable. Highly recommend for anyone looking to secure their digital assets.",
    author: "John",
    image: defaultuser,
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [apiMessage, setApiMessage] = useState<string>(''); // State to store the API message

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleButtonClick = () => {
    // Fetch from your API
    fetch('/api/hello?message=press')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setApiMessage(data.message)) // Update state with API response
      .catch((error) => {
        console.error('Error fetching the API:', error);
        setApiMessage('Failed to fetch the message.'); // Set error message
      });
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Secure Your Social Media With Confidence</h1>
        <p className="hero-subtext">
          The most trusted platform for protecting your social media assets.
        </p>
        <button className="hero-button" onClick={handleButtonClick}>
          GET YOUR QUOTE
        </button>
        {apiMessage && <p className="api-response">{apiMessage}</p>} {/* Display API message */}
      </div>
      <div className="testimonial-section">
        <div className="testimonial-slide">
          <div className="testimonial-content">
            <p>"{testimonials[currentSlide].quote}"</p>
            <h4>— {testimonials[currentSlide].author}</h4>
          </div>
          <div className="testimonial-avatar">
            <img
              src={testimonials[currentSlide].image}
              alt="Testimonial"
            />
          </div>
        </div>
        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
