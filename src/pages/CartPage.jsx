import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { sendOrderToTelegram } from '../services/telegramService';
import { FaShoppingCart, FaTrash, FaCheckCircle, FaCreditCard, FaTimes, FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    customerName: user?.fullName || '',
    phone: user?.phone || '',
    address: ''
  });
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const cardNumber = '8600 1234 5678 9012';

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Savatingiz bo\'sh');
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleConfirmOrder = async () => {
    const orderId = Date.now().toString();
    const total = getTotal();

    const order = {
      orderId,
      items: cart,
      total,
      customerName: checkoutData.customerName,
      phone: checkoutData.phone,
      address: checkoutData.address,
      cardNumber,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Send to Telegram
    const result = await sendOrderToTelegram(order);

    if (result.success) {
      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      setOrderDetails(order);
      setShowCheckoutModal(false);
      setShowReceiptModal(true);
      clearCart();
    } else {
      alert('Buyurtma yuborishda xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-8">Savat</h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FaShoppingCart className="text-6xl mb-4 mx-auto text-purple-400" />
          <p className="text-xl text-gray-600 mb-4">Savatingiz bo'sh</p>
          <button
            onClick={() => navigate('/mahsulotlar')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
          >
            Mahsulotlarga o'tish
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center p-4 border-b last:border-b-0 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 cart-item-fade-in"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {item.price.toLocaleString()} so'm
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded hover:from-purple-200 hover:to-indigo-200 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold text-purple-600"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded hover:from-purple-200 hover:to-indigo-200 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold text-purple-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition-all duration-200 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-red-400 rounded p-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-gray-800">Jami:</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {getTotal().toLocaleString()} so'm
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium text-lg"
            >
              Buyurtma berish
            </button>
          </div>
        </>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 backdrop-fade">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden modal-enter">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Ma'lumotlarni kiriting</h2>
                <p className="text-purple-200 text-sm mt-0.5">Buyurtmani rasmiylashtirish</p>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-150"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  <FaUser className="inline mr-1.5 text-purple-500" />To'liq ism
                </label>
                <input
                  type="text"
                  value={checkoutData.customerName}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, customerName: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400"
                  placeholder="Ismingizni kiriting"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  <FaPhone className="inline mr-1.5 text-purple-500" />Telefon
                </label>
                <input
                  type="tel"
                  value={checkoutData.phone}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400"
                  placeholder="+998 XX XXX XX XX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  <FaMapMarkerAlt className="inline mr-1.5 text-purple-500" />Manzil
                </label>
                <textarea
                  value={checkoutData.address}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, address: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition placeholder-gray-400 resize-none"
                  placeholder="Yetkazib berish manzilingizni kiriting"
                  rows="3"
                  required
                />
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
                <p className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <FaCreditCard className="text-purple-500" />To'lov kartasi:
                </p>
                <p className="text-lg font-mono font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {cardNumber}
                </p>
                <p className="text-xs text-gray-500 mt-1.5">
                  Bu karta raqamiga to'lov qiling va chekni Telegram botga yuboring
                </p>
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6 pt-2 border-t border-gray-100">
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptModal && orderDetails && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 backdrop-fade">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl modal-enter">
            <div className="text-center mb-4">
              <FaCheckCircle className="text-6xl mb-4 mx-auto text-green-500 animate-pulse" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Buyurtma qabul qilindi!
              </h2>
              <p className="text-gray-600">
                Buyurtma #{orderDetails.orderId}
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg mb-4 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Chek:</h3>
              <div className="space-y-2 text-sm">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-medium">
                      {(item.price * item.quantity).toLocaleString()} so'm
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Jami:</span>
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {orderDetails.total.toLocaleString()} so'm
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg mb-4 border border-purple-100">
              <p className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaCreditCard /> To'lov ma'lumotlari:
              </p>
              <p className="text-lg font-mono font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {orderDetails.cardNumber}
              </p>
              <p className="text-xs text-gray-600">
                Iltimos, ushbu karta raqamiga to'lov qiling va to'lov chekini Telegram botga yuboring.
              </p>
            </div>

            <button
              onClick={() => {
                setShowReceiptModal(false);
                navigate('/buyurtmalar');
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Buyurtmalarimga o'tish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;