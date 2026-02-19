import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sendReceiptToTelegram } from '../utils/telegramBot';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [sending, setSending] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cartData.length === 0) {
      navigate('/products');
    }
    setCart(cartData);
  }, [navigate]);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowPayment(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptFile(file);
    }
  };

  const handleSubmitReceipt = async () => {
    if (!receiptFile) {
      alert("Iltimos, to'lov chekini yuklang!");
      return;
    }

    setSending(true);

    // Create order
    const order = {
      id: Date.now(),
      userId: user.id,
      customerName: user.name,
      items: cart,
      total: total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save order
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Send to Telegram
    const result = await sendReceiptToTelegram(order, receiptFile);

    setSending(false);

    if (result.success) {
      // Clear cart
      localStorage.setItem('cart', JSON.stringify([]));
      
      alert('✅ Buyurtma muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
      navigate('/orders');
    } else {
      alert('❌ Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
    }
  };

  if (!showPayment) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Buyurtmani tasdiqlash</h1>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Buyurtma tafsilotlari</h2>
            
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.quantity} x {item.price.toLocaleString()} so'm</p>
                    </div>
                  </div>
                  <p className="font-semibold text-purple-600">
                    {(item.quantity * item.price).toLocaleString()} so'm
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-xl font-bold">Jami:</span>
              <span className="text-2xl font-bold text-purple-600">
                {total.toLocaleString()} so'm
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Mijoz ma'lumotlari</h2>
            <div className="space-y-2">
              <p><span className="font-semibold">Ism:</span> {user?.name}</p>
              <p><span className="font-semibold">Email:</span> {user?.email}</p>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            To'lov sahifasiga o'tish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">To'lov ma'lumotlari</h1>

        <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">💳 Karta ma'lumotlari</h2>
            <p className="text-purple-100">Quyidagi karta raqamiga to'lov qiling</p>
          </div>

          <div className="bg-white/20 backdrop-blur rounded-lg p-6 mb-4">
            <p className="text-sm text-purple-100 mb-2">Karta raqami</p>
            <p className="text-3xl font-mono font-bold tracking-wider">
              8600 1234 5678 9012
            </p>
            <p className="text-xs text-purple-100 mt-2">
              ⚠️ Demo: Haqiqiy karta raqami emas
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <p className="text-sm text-purple-100 mb-1">Karta egasi</p>
              <p className="text-lg font-semibold">WEBCAT SHOP</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <p className="text-sm text-purple-100 mb-1">Summa</p>
              <p className="text-lg font-bold">{total.toLocaleString()} so'm</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📸 To'lov chekini yuklang
          </h2>
          <p className="text-gray-600 mb-4">
            To'lovni amalga oshirgandan so'ng, chek rasmini yuklang
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="receipt-upload"
            />
            <label
              htmlFor="receipt-upload"
              className="cursor-pointer inline-block"
            >
              <div className="text-6xl mb-4">📄</div>
              <p className="text-purple-600 font-semibold mb-2">
                Fayl tanlash uchun bosing
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG (max. 5MB)
              </p>
            </label>
            
            {receiptFile && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700">✅ {receiptFile.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            ℹ️ Chekni yuklaganingizdan so'ng, buyurtmangiz Telegram botga yuboriladi 
            va tez orada siz bilan bog'lanamiz.
          </p>
        </div>

        <button
          onClick={handleSubmitReceipt}
          disabled={!receiptFile || sending}
          className={`w-full font-medium py-3 rounded-lg transition-colors ${
            !receiptFile || sending
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {sending ? 'Yuborilmoqda...' : "Chekni yuborish va buyurtmani tasdiqlash"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
