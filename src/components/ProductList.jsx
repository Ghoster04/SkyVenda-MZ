import React from 'react';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: 'Smartphone XYZ', price: 15000, rating: 4.5, image: 'https://via.placeholder.com/300x300' },
  { id: 2, name: 'Laptop ABC', price: 45000, rating: 4.8, image: 'https://via.placeholder.com/300x300' },
  { id: 3, name: 'Fones de Ouvido QWE', price: 2500, rating: 4.2, image: 'https://via.placeholder.com/300x300' },
  { id: 4, name: 'Smartwatch 123', price: 8000, rating: 4.0, image: 'https://via.placeholder.com/300x300' },
  { id: 5, name: 'Câmera Digital PRO', price: 35000, rating: 4.7, image: 'https://via.placeholder.com/300x300' },
  { id: 6, name: 'Console de Jogos Next', price: 30000, rating: 4.9, image: 'https://via.placeholder.com/300x300' },
];

function ProductList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Produtos em Destaque</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;