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
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-700 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 md:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <FaBars className="text-2xl" />
              </button>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 drop-shadow-lg">
                <FaCat className="text-3xl md:text-4xl animate-pulse" />
                <div className="flex flex-col">
                  <span>Web Cat Admin</span>
                  <span className="text-xs font-normal text-white/80 hidden sm:block">Boshqaruv paneli</span>
                </div>
              </h1>
            </div>
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {(user?.fullName || user?.username || 'A').charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.fullName || user?.username}</span>
                  <span className="text-xs text-white/70">Administrator</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-red-500 text-white px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium hover:shadow-lg transform hover:scale-105"
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
            fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out mt-16
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
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${location.pathname === item.path
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-100'
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