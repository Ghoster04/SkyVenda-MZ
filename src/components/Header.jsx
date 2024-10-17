import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiHome, FiMessageSquare, FiBell, FiMenu } from 'react-icons/fi';
import Cart from './Cart';

const suggestedProducts = [
  'Smartphone XYZ',
  'Laptop ABC',
  'Fones de Ouvido QWE',
  'Smartwatch 123',
  'Câmera Digital PRO',
  'Console de Jogos Next',
];

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-center py-4">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              SkyVenda MZ
            </Link>
          </div>
          <div className="flex-grow mx-4 relative max-w-[400px] w-full">
            <div className="relative search-container">
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500">
                <FiSearch size={20} />
              </button>
            </div>
            {searchTerm && (
              <ul className="absolute z-10 bg-white w-full mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
                {suggestedProducts
                  .filter((product) =>
                    product.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((product, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSearchTerm(product)}
                    >
                      {product}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/notifications" className="text-gray-600 hover:text-blue-600 relative">
              <FiBell size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
                3
              </span>
            </Link>
            <Link to="/messages" className="text-gray-600 hover:text-blue-600 relative">
              <FiMessageSquare size={24} />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
                5
              </span>
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-gray-600 hover:text-blue-600 relative cursor-pointer"
            >
              <FiShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          {/* Top Row */}
          <div className="flex justify-between items-center py-3">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              SkyVenda MZ
            </Link>
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-600">
                <FiSearch size={24} />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-gray-600 relative"
              >
                <FiShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>

          {/* Search Bar (conditionally rendered) */}
          {isSearchOpen && (
            <div className="py-2">
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {/* Bottom Row */}
          <div className="flex justify-between items-center py-2">
            <Link to="/" className="text-gray-600 flex flex-col items-center">
              <FiHome size={24} />
              <span className="text-xs mt-1">Início</span>
            </Link>
            <Link to="/messages" className="text-gray-600 flex flex-col items-center relative">
              <FiMessageSquare size={24} />
              <span className="text-xs mt-1">Mensagens</span>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
                5
              </span>
            </Link>
            <Link to="/notifications" className="text-gray-600 flex flex-col items-center relative">
              <FiBell size={24} />
              <span className="text-xs mt-1">Notificações</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
                3
              </span>
            </Link>
            <button className="text-gray-600 flex flex-col items-center">
              <FiMenu size={24} />
              <span className="text-xs mt-1">Menu</span>
            </button>
          </div>
        </div>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}

export default Header;