import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { name: 'Mahsulotlar', path: '/products', icon: '🛍️' },
    { name: 'Buyurtmalar', path: '/orders', icon: '📦' },
    { name: "Do'kon haqida", path: '/about', icon: 'ℹ️' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span>🐱</span>
          <span>Web Cat</span>
        </h1>
        <p className="text-purple-200 text-sm mt-2">Mushuklar uchun do'kon</p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'hover:bg-purple-700 text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
          
          {user?.isAdmin && (
            <li>
              <Link
                to="/admin"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive('/admin')
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'hover:bg-purple-700 text-white'
                }`}
              >
                <span className="text-xl">👨‍💼</span>
                <span className="font-medium">Admin Panel</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="mt-auto pt-6 border-t border-purple-500">
        <div className="text-sm text-purple-200">
          {user ? (
            <div>
              <p className="font-medium text-white">👤 {user.name}</p>
              <p className="text-xs mt-1">{user.email}</p>
            </div>
          ) : (
            <p>Mehmon</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
