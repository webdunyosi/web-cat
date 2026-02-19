import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaSearch, FaFilter, FaBoxOpen, FaTag, FaMoneyBillWave, FaImage } from 'react-icons/fa';

const categoryConfig = {
  ozuqalar: { label: 'Ozuqalar', color: 'bg-emerald-100 text-emerald-700 ring-emerald-300', gradient: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  buyumlar: { label: 'Buyumlar', color: 'bg-blue-100 text-blue-700 ring-blue-300', gradient: 'from-blue-400 to-indigo-500', bg: 'bg-blue-50', text: 'text-blue-600' },
  mushuklar: { label: 'Mushuklar', color: 'bg-pink-100 text-pink-700 ring-pink-300', gradient: 'from-pink-400 to-rose-500', bg: 'bg-pink-50', text: 'text-pink-600' },
};

const defaultCategoryConfig = { label: 'Boshqa', color: 'bg-gray-100 text-gray-600 ring-gray-300', gradient: 'from-gray-400 to-gray-500', bg: 'bg-gray-50', text: 'text-gray-600' };

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'ozuqalar',
    price: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const stored = localStorage.getItem('products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      // Load from JSON file if no products in localStorage
      import('../../data/products.json')
        .then(module => {
          const defaultProducts = module.default;
          setProducts(defaultProducts);
          localStorage.setItem('products', JSON.stringify(defaultProducts));
        })
        .catch(error => {
          console.error('Failed to load products:', error);
          setProducts([]);
        });
    }
  };

  const saveProducts = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: '',
      category: 'ozuqalar',
      price: '',
      image: '',
      description: ''
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      image: product.image,
      description: product.description
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseInt(formData.price, 10)
    };

    let updatedProducts;
    if (editingProduct) {
      // Update existing product
      updatedProducts = products.map(p => 
        p.id === productData.id ? productData : p
      );
    } else {
      // Add new product
      updatedProducts = [...products, productData];
    }

    saveProducts(updatedProducts);
    setShowModal(false);
    setFormData({
      id: '',
      name: '',
      category: 'ozuqalar',
      price: '',
      image: '',
      description: ''
    });
  };

  const handleDelete = (productId) => {
    if (window.confirm('Mahsulotni o\'chirishni xohlaysizmi?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      saveProducts(updatedProducts);
    }
  };

  const categories = Object.entries(categoryConfig).map(([value, cfg]) => ({ value, ...cfg }));

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    {
      label: 'Jami mahsulotlar',
      value: products.length,
      icon: FaBoxOpen,
      gradient: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50',
      text: 'text-violet-600',
    },
    ...Object.entries(categoryConfig).map(([value, cfg]) => ({
      label: cfg.label,
      value: products.filter(p => p.category === value).length,
      icon: FaTag,
      gradient: cfg.gradient,
      bg: cfg.bg,
      text: cfg.text,
    })),
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mahsulotlarni boshqarish</h1>
            <p className="text-purple-200 mt-1 text-sm">Barcha mahsulotlarni ko'ring, tahrirlang va boshqaring</p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-white text-purple-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-100 self-start sm:self-auto"
          >
            <FaPlus />
            <span>Yangi mahsulot</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.bg} rounded-xl p-4 flex items-center gap-4 shadow-sm border border-white`}>
              <div className={`bg-gradient-to-br ${stat.gradient} text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                <Icon className="text-lg" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className={`text-xs font-medium ${stat.text}`}>{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Mahsulot nomini qidiring..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div className="relative">
          <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white transition appearance-none cursor-pointer"
          >
            <option value="all">Barcha kategoriyalar</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Mahsulotlar ro'yxati
          </span>
          <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full">
            {filteredProducts.length} ta
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Rasm</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Nomi</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Kategoriya</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Narxi</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <FaBoxOpen className="text-5xl text-gray-200" />
                      <p className="text-sm font-medium">Mahsulotlar topilmadi</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, index) => {
                  const catCfg = categoryConfig[product.category] || defaultCategoryConfig;
                  return (
                    <tr
                      key={product.id}
                      className={`transition-colors duration-150 hover:bg-purple-50/50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}
                    >
                      <td className="px-6 py-3.5">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-400 truncate max-w-xs mt-0.5">{product.description}</p>
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${catCfg.color}`}>
                          {catCfg.label}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap">
                        <span className="text-sm font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg">
                          {product.price.toLocaleString()} so'm
                        </span>
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors duration-150"
                            title="Tahrirlash"
                          >
                            <FaEdit />
                            <span className="hidden sm:inline">Tahrirlash</span>
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors duration-150"
                            title="O'chirish"
                          >
                            <FaTrash />
                            <span className="hidden sm:inline">O'chirish</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-2xl px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingProduct ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}
                </h2>
                <p className="text-purple-200 text-sm mt-0.5">
                  {editingProduct ? 'Ma\'lumotlarni yangilang' : 'Yangi mahsulot ma\'lumotlarini kiriting'}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-150"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mahsulot nomi
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400"
                  placeholder="Mahsulot nomini kiriting"
                />
              </div>

              {/* Category + Price row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <FaTag className="inline mr-1.5 text-purple-500" />Kategoriya
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white transition"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <FaMoneyBillWave className="inline mr-1.5 text-purple-500" />Narxi (so'm)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  <FaImage className="inline mr-1.5 text-purple-500" />Rasm URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400"
                  placeholder="/ozuqalar/1.png"
                />
                {formData.image && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-purple-100 shadow-sm">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-400">Rasm ko'rinishi</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Tavsif
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400 resize-none"
                  placeholder="Mahsulot haqida ma'lumot"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-150"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-100"
                >
                  <FaSave />
                  <span>{editingProduct ? 'Saqlash' : 'Qo\'shish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;