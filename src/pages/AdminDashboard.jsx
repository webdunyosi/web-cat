import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBox, FaMoneyBillWave, FaShoppingBag, FaClock,
  FaCheckCircle, FaTimes, FaShippingFast, FaChartLine,
  FaArrowRight, FaUsers, FaBoxOpen, FaQuestion,
} from 'react-icons/fa';

const statusConfig = {
  pending: {
    label: 'Kutilmoqda',
    icon: FaClock,
    className: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  },
  confirmed: {
    label: 'Tasdiqlangan',
    icon: FaShippingFast,
    className: 'bg-blue-100 text-blue-700 ring-1 ring-blue-200',
  },
  completed: {
    label: 'Yetkazildi',
    icon: FaCheckCircle,
    className: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  },
  cancelled: {
    label: 'Bekor qilindi',
    icon: FaTimes,
    className: 'bg-red-100 text-red-700 ring-1 ring-red-200',
  },
  unknown: {
    label: 'Noma\'lum',
    icon: FaQuestion,
    className: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
  },
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const products = JSON.parse(localStorage.getItem('products') || '[]');

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;

    setStats({
      totalOrders: orders.length,
      totalRevenue,
      totalProducts: products.length || 9,
      pendingOrders,
    });

    setRecentOrders(orders.slice(-5).reverse());
  }, []);

  const statCards = [
    {
      label: 'Jami buyurtmalar',
      value: stats.totalOrders,
      icon: FaBox,
      gradient: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50',
      text: 'text-violet-600',
    },
    {
      label: 'Jami daromad',
      value: `${stats.totalRevenue.toLocaleString()} so'm`,
      icon: FaMoneyBillWave,
      gradient: 'from-emerald-400 to-teal-500',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
    },
    {
      label: 'Jami mahsulotlar',
      value: stats.totalProducts,
      icon: FaShoppingBag,
      gradient: 'from-blue-400 to-indigo-500',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
    },
    {
      label: 'Kutilayotgan',
      value: stats.pendingOrders,
      icon: FaClock,
      gradient: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50',
      text: 'text-amber-600',
    },
  ];

  const quickLinks = [
    { to: '/admin/mahsulotlar', label: 'Mahsulotlar', icon: FaBoxOpen, gradient: 'from-blue-400 to-indigo-500' },
    { to: '/admin/buyurtmalar', label: 'Buyurtmalar', icon: FaBox, gradient: 'from-violet-500 to-purple-600' },
    { to: '/admin/foydalanuvchilar', label: 'Foydalanuvchilar', icon: FaUsers, gradient: 'from-pink-400 to-rose-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
              <FaChartLine /> Dashboard
            </h1>
            <p className="text-purple-200 mt-1 text-sm">Tizim umumiy ko'rsatkichlari va so'nggi faoliyat</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.bg} rounded-xl p-4 flex items-center gap-4 shadow-sm border border-white`}>
              <div className={`bg-gradient-to-br ${stat.gradient} text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                <Icon className="text-lg" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-gray-800 truncate">{stat.value}</p>
                <p className={`text-xs font-medium ${stat.text}`}>{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.to}
              to={link.to}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between group hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <div className={`bg-gradient-to-br ${link.gradient} text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-md`}>
                  <Icon className="text-base" />
                </div>
                <span className="font-semibold text-gray-700">{link.label}</span>
              </div>
              <FaArrowRight className="text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-200" />
            </Link>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            So'nggi buyurtmalar
          </span>
          <Link
            to="/admin/buyurtmalar"
            className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors"
          >
            Barchasi <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          {recentOrders.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center gap-3 text-gray-400">
              <FaBox className="text-5xl text-gray-200" />
              <p className="text-sm font-medium">Hali buyurtmalar yo'q</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <th className="px-3 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Buyurtma ID</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Mijoz</th>
                  <th className="hidden sm:table-cell px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Mahsulotlar</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Jami</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order, index) => {
                  const status = statusConfig[order.status] || statusConfig.unknown;
                  const StatusIcon = status.icon;
                  return (
                    <tr
                      key={order.orderId}
                      className={`transition-colors duration-150 hover:bg-purple-50/50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}
                    >
                      <td className="px-3 sm:px-6 py-2 sm:py-3.5 whitespace-nowrap">
                        <span className="text-xs sm:text-sm font-mono font-semibold text-gray-700">#{order.orderId.slice(-6)}</span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-3.5 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800">
                        {order.customerName}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-3.5 text-sm text-gray-600">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                          {order.items.length} ta mahsulot
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-3.5 whitespace-nowrap">
                        <span className="text-xs sm:text-sm font-bold text-purple-600 bg-purple-50 px-2 sm:px-2.5 py-1 rounded-lg">
                          {order.total.toLocaleString()} so'm
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold ${status.className}`}>
                          <StatusIcon className="text-[10px]" />
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;