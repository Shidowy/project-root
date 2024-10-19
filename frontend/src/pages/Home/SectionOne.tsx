import React from 'react';
import './SectionOne.css'; // Ensure this path matches your file structure

const SectionOne: React.FC = () => {
  return (
    <div className="section-one">
      <div className="text-content">
        <h1>Discover And Collect Rare NFTs</h1>
        <p>The most secure marketplace for buying and selling unique crypto assets.</p>
      </div>
      <div className="image-box">
        {/* Placeholder for an image */}
        <img src="" alt="Placeholder" className="image-placeholder" />
      </div>
    </div>
  );
};

export default SectionOne;
