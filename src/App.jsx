import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryRow from './components/CategoryRow';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import SideAd from './components/SideAd';
import AdRow from './components/AdRow';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Toaster position="top-right" />
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <div className="mb-12 py-8 bg-gray-100">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-3/4">
                      <h2 className="text-3xl font-bold mb-6 text-gray-800">Categorias</h2>
                      <div className="flex flex-col space-y-5">
                        <CategoryRow />
                        <AdRow />
                      </div>
                    </div>
                    <div className="w-full md:w-1/4">
                      <SideAd />
                    </div>
                  </div>
                </div>
              </div>
              <main className="container mx-auto px-4 py-8">
                <FeaturedProducts />
              </main>
            </>
          } />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;