import React from 'react';
import './ProductServices.css';

interface Product {
  id: number;
  title: string;
  description: string;
}

const ProductServices: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      title: "Product 1",
      description: "This is a brief description of Product 1.",
    },
    {
      id: 2,
      title: "Product 2",
      description: "This is a brief description of Product 2.",
    },
    {
      id: 3,
      title: "Product 3",
      description: "This is a brief description of Product 3.",
    },
    {
      id: 4,
      title: "Product 4",
      description: "This is a brief description of Product 4.",
    },
  ];

  return (
    <section className="product-services">
      <h2>Our Products</h2>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <div className="purple-box">
              Learn More
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductServices;
