import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function formatPrice(price) {
  return new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(price);
}

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Previne a navegação para a página do produto
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const handleLike = (e) => {
    e.preventDefault(); // Previne a navegação para a página do produto
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Produto removido dos favoritos!' : 'Produto adicionado aos favoritos!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
    >
      <Link to={`/product/${product.id}`} className="block">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition duration-300">{product.name}</h3>
          <p className="text-gray-600 mb-4 font-bold">{formatPrice(product.price)}</p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
                ))}
              </div>
              <span className="text-gray-600">({product.rating})</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className={`p-1 rounded-full ${
                  isLiked ? 'text-red-500 bg-red-100' : 'text-gray-400 bg-gray-100'
                } hover:bg-gray-200 transition-colors duration-300 cursor-pointer`}
              >
                <FiHeart className={isLiked ? 'fill-current' : ''} />
              </button>
              <div className="flex items-center text-gray-500">
                <FiEye className="mr-1" />
                <span>{Math.floor(Math.random() * 1000) + 100}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-6 pb-6">
        <button
          onClick={handleAddToCart}
          className="w-full py-2 px-4 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 cursor-pointer"
        >
          <FiShoppingCart className="inline-block mr-2" />
          Adicionar ao Carrinho
        </button>
      </div>
    </motion.div>
  );
}

export default ProductCard;