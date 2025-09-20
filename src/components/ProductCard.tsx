
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="card product-card" onClick={onClick}>
      <div className="product-card-icon">{product.icon}</div>
      <h3 className="product-card-name">{product.name}</h3>
      <p className="product-card-desc">{product.description}</p>
    </div>
  );
};

export default ProductCard;
