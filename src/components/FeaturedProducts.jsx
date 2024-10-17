import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import SponsoredProductCard from './SponsoredProductCard';
import { motion } from 'framer-motion';
import ProgressRing from './ProgressRing';
import Skeleton from './Skeleton';

const initialProducts = [
  { id: 1, name: 'Smartphone XYZ', price: 15000, rating: 4.5, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Laptop ABC', price: 45000, rating: 4.8, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Fones de Ouvido QWE', price: 2500, rating: 4.2, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: 'Smartwatch 123', price: 8000, rating: 4.0, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80' },
  { id: 5, name: 'Tablet Pro', price: 20000, rating: 4.6, image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80' },
  { id: 6, name: 'Smart TV 4K', price: 35000, rating: 4.7, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80' },
  { id: 7, name: 'Câmera Digital', price: 28000, rating: 4.4, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80' },
  { id: 8, name: 'Console de Jogos', price: 32000, rating: 4.9, image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80' },
  { id: 9, name: 'Drone', price: 18000, rating: 4.3, image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80' },
  { id: 10, name: 'Impressora 3D', price: 25000, rating: 4.1, image: 'https://images.unsplash.com/photo-1565095761837-9ce5e7a831a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80' },
  // Adicione mais produtos conforme necessário
];

const sponsoredProducts = [
  {
    id: 'sponsored1',
    title: 'Oferta Especial',
    description: 'Até 50% de desconto em eletrônicos',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sponsored2',
    title: 'Novos Lançamentos',
    description: 'Confira os últimos smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sponsored3',
    title: 'Frete Grátis',
    description: 'Em compras acima de 5000 MZN',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
];

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [sponsoredIndex, setSponsoredIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [firstAdIndex] = useState(Math.floor(Math.random() * 3)); // Random index 0, 1, or 2

  useEffect(() => {
    loadInitialProducts();
  }, []);

  useEffect(() => {
    const sponsoredTimer = setInterval(() => {
      setSponsoredIndex((prevIndex) => (prevIndex + 1) % sponsoredProducts.length);
    }, 5000);

    return () => clearInterval(sponsoredTimer);
  }, []);

  const loadInitialProducts = () => {
    setTimeout(() => {
      const initialLoadProducts = initialProducts.slice(0, 8);
      setProducts(initialLoadProducts);
      setLoading(false);
    }, 2000);
  };

  const loadMoreProducts = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = products.length;
      const nextProducts = initialProducts.slice(currentLength, currentLength + 5);
      if (nextProducts.length > 0) {
        setProducts(prevProducts => [...prevProducts, ...nextProducts]);
      } else {
        setHasMore(false);
      }
      setLoadingMore(false);
    }, 1500);
  }, [products, loadingMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasMore && !loadingMore && !loading) {
          loadMoreProducts();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadingMore, loading, loadMoreProducts]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Produtos em Destaque</h2>
        <Skeleton type="product" />
      </div>
    );
  }

  const renderProductOrAd = (product, index) => {
    if (index === firstAdIndex || (index > firstAdIndex && (index - firstAdIndex) % 5 === 0)) {
      return (
        <SponsoredProductCard
          key={`sponsored-${index}`}
          product={sponsoredProducts[sponsoredIndex]}
        />
      );
    }
    return <ProductCard key={product.id} product={product} />;
  };

  return (
    <div className="container mx-auto px-4 mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Produtos em Destaque</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={`${product.id}-${index}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            {renderProductOrAd(product, index)}
          </motion.div>
        ))}
      </div>
      {loadingMore && (
        <div className="flex justify-center items-center mt-8">
          <ProgressRing />
        </div>
      )}
      {!hasMore && (
        <p className="text-center mt-8 text-gray-600">Não há mais produtos para carregar.</p>
      )}
    </div>
  );
}

export default FeaturedProducts;