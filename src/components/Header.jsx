import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Web Cat Do'koni</h2>
          <p className="text-sm text-gray-600">Mushuklar uchun eng yaxshi mahsulotlar</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/cart')}
            className="relative bg-purple-100 hover:bg-purple-200 text-purple-600 px-4 py-2 rounded-lg transition-colors"
          >
            <span className="text-xl mr-2">🛒</span>
            <span className="font-medium">Savatcha</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Chiqish
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Kirish
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
