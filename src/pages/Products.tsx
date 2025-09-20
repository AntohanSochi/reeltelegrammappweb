
import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import type { Product } from '../types';

const Products: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div>
      <h1>Все продукты</h1>
      <p>Выберите инструмент, чтобы начать генерацию контента.</p>
      
      <div className="grid grid-cols-3">
        {products.map(product => (
          <ProductCard
            key={product.key}
            product={product}
            onClick={() => handleCardClick(product)}
          />
        ))}
      </div>

      <ProductModal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
