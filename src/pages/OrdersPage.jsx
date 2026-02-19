import React, { useState, useEffect } from 'react';
import { FaBox, FaCheckCircle, FaClock, FaTimes, FaShippingFast } from 'react-icons/fa';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders.reverse()); // Show newest first
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200';
      case 'confirmed':
        return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200';
      case 'completed':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Kutilmoqda';
      case 'confirmed':
        return 'Tasdiqlangan';
      case 'completed':
        return 'Yetkazildi';
      case 'cancelled':
        return 'Bekor qilindi';
      default:
        return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="inline-block mr-1" />;
      case 'confirmed':
        return <FaShippingFast className="inline-block mr-1" />;
      case 'completed':
        return <FaCheckCircle className="inline-block mr-1" />;
      case 'cancelled':
        return <FaTimes className="inline-block mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-8">
        Mening buyurtmalarim
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FaBox className="text-6xl mb-4 mx-auto text-purple-400" />
          <p className="text-xl text-gray-600 mb-4">Hali buyurtmalar yo'q</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, orderIndex) => (
            <div 
              key={order.orderId} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] order-fade-in"
              style={{
                animationDelay: `${orderIndex * 0.1}s`
              }}
            >
              <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 px-6 py-4 border-b border-purple-100">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Buyurtma #{order.orderId}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(order.createdAt).toLocaleDateString('uz-UZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                    <FaBox className="text-purple-600" />
                    Mahsulotlar:
                  </h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg hover:from-purple-50 hover:to-indigo-50 transition-all duration-300"
                      >
                        <span className="text-gray-800 font-medium">
                          {item.name} <span className="text-purple-600 font-bold">x {item.quantity}</span>
                        </span>
                        <span className="font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                          {(item.price * item.quantity).toLocaleString()} so'm
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-xl mb-6 border border-purple-100">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Jami summa:</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      {order.total.toLocaleString()} so'm
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3 text-lg">Buyurtma ma'lumotlari:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 min-w-[80px]">Mijoz:</span>
                      <span className="text-gray-800">{order.customerName}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 min-w-[80px]">Telefon:</span>
                      <span className="text-gray-800">{order.phone}</span>
                    </div>
                    {order.address && (
                      <div className="flex items-start gap-2 md:col-span-2">
                        <span className="font-semibold text-gray-700 min-w-[80px]">Manzil:</span>
                        <span className="text-gray-800">{order.address}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 md:col-span-2">
                      <span className="font-semibold text-gray-700 min-w-[80px]">Karta:</span>
                      <span className="text-gray-800 font-mono">{order.cardNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;