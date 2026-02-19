import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import productsData from '../../data/products.json';
import { FaStar, FaCat, FaDrumstickBite, FaBaseballBall, FaTimes } from 'react-icons/fa';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    setProducts(productsData);
  }, []);

  // Trigger animation when category changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedCategory]);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'Hammasi', icon: FaStar },
    { id: 'mushuklar', name: 'Mushuklar', icon: FaCat },
    { id: 'ozuqalar', name: 'Ozuqalar', icon: FaDrumstickBite },
    { id: 'buyumlar', name: 'Buyumlar', icon: FaBaseballBall },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-8 drop-shadow-sm">
        Mahsulotlar
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(category => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400
                ${selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg ring-2 ring-purple-400'
                  : 'bg-white/70 backdrop-blur-md border border-purple-100 text-gray-700 hover:bg-purple-50/80 hover:shadow-md shadow-sm'
                }
              `}
            >
              <IconComponent className="text-lg" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={`${product.id}-${animationKey}`}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-md overflow-hidden hover:shadow-xl hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 group product-fade-in"
            style={{
              animationDelay: `${Math.min(index * 0.1, 1.5)}s`
            }}
          >
            <div
              className="relative overflow-hidden cursor-pointer"
              onClick={() => setSelectedProduct(product)}
              role="button"
              aria-label={`${product.name} haqida batafsil ma'lumot`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProduct(product);
                }
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover/focus overlay with backdrop blur */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 backdrop-blur-[1px] flex items-end p-4" aria-hidden="true">
                <span className="text-white text-sm font-medium transition-transform duration-300">
                  Batafsil ko'rish →
                </span>
              </div>
              <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-purple-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm capitalize border border-white/60">
                {product.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-base font-semibold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors line-clamp-1" title={product.name}>
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-purple-600">
                  {product.price.toLocaleString()} so'm
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium text-sm"
                >
                  + Savatga
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-white/60">
          <p className="text-gray-500 text-lg">Mahsulotlar topilmadi</p>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4 backdrop-fade"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-white/60 modal-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400 z-10"
              >
                <FaTimes className="text-gray-700" />
              </button>
              <div className="relative group">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                {selectedProduct.name}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {selectedProduct.description}
              </p>
              <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {selectedProduct.price.toLocaleString()} so'm
                </span>
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
                >
                  Savatga qo'shish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;