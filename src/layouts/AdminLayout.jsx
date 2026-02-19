import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCat, FaChartBar, FaShoppingBag, FaBox, FaUsers, FaBars } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: FaChartBar },
    { path: '/admin/mahsulotlar', label: 'Mahsulotlar', icon: FaShoppingBag },
    { path: '/admin/buyurtmalar', label: 'Buyurtmalar', icon: FaBox },
    { path: '/admin/foydalanuvchilar', label: 'Foydalanuvchilar', icon: FaUsers },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 md:hidden hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
              >
                <FaBars className="text-xl" />
              </button>
              <h1 className="text-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                <FaCat className="animate-pulse" /> Web Cat Admin
              </h1>
            </div>
            <div className="flex items-center space-x-3 md:space-x-4 bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
              <span className="hidden sm:inline text-sm font-medium">{user?.fullName || user?.username}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-purple-700 px-4 py-1.5 rounded-full hover:bg-purple-50 text-sm font-semibold transition-all duration-200 hover:scale-105 shadow-md"
              >
                Chiqish
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-purple-700 to-purple-900 shadow-2xl transform transition-transform duration-300 ease-in-out mt-16
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 md:mt-0
          `}
        >
          <nav className="p-4 space-y-2 overflow-y-auto h-full">
            {menuItems.map(item => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${location.pathname === item.path
                      ? 'bg-white text-purple-700 shadow-lg transform scale-105 ring-2 ring-purple-400'
                      : 'text-white hover:bg-purple-600 hover:shadow-md hover:scale-105'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <IconComponent className="text-xl" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;