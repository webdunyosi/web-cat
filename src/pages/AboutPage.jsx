import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">🐱 Web Cat Do'koni</h1>
          <p className="text-lg">Mushuklarning sevimli do'koni</p>
        </div>

        <div className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Biz haqimizda</h2>
            <p className="text-gray-600 leading-relaxed">
              Web Cat - bu mushuklar va ularning egalariga mo'ljallangan mahsulotlarning eng keng
              tanlovini taklif etuvchi onlayn do'kon. Biz 2024-yilda ochilganmiz va mijozlarimizga
              yuqori sifatli mahsulotlar va xizmatlarni taqdim etamiz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Bizning xizmatlarimiz</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-3xl mb-2">🛍️</div>
                <h3 className="font-semibold text-gray-800 mb-2">Keng tanlov</h3>
                <p className="text-gray-600 text-sm">
                  Mushuklar, ozuqalar va turli xil buyumlar uchun mahsulotlarning katta assortimenti
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="font-semibold text-gray-800 mb-2">Tez yetkazib berish</h3>
                <p className="text-gray-600 text-sm">
                  Toshkent bo'ylab 24 soat ichida, boshqa hududlarga 2-3 kun ichida
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-3xl mb-2">💳</div>
                <h3 className="font-semibold text-gray-800 mb-2">Qulay to'lov</h3>
                <p className="text-gray-600 text-sm">
                  Plastik kartalar orqali to'lov, Telegram bot orqali chekni yuborish
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-3xl mb-2">🎁</div>
                <h3 className="font-semibold text-gray-800 mb-2">Aksiyalar</h3>
                <p className="text-gray-600 text-sm">
                  Doimiy aksiyalar, chegirmalar va bonus dasturlarimiz
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Aloqa</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-semibold text-gray-800">Telefon:</p>
                  <p className="text-gray-600">+998 90 123 45 67</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-semibold text-gray-800">Email:</p>
                  <p className="text-gray-600">info@webcat.uz</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-800">Manzil:</p>
                  <p className="text-gray-600">Toshkent shahri, Chilonzor tumani</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="font-semibold text-gray-800">Telegram Bot:</p>
                  <p className="text-gray-600">@webcat_uz_bot</p>
                  <p className="text-sm text-gray-500">Buyurtma chekini botga yuboring</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Ish vaqti</h2>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Dushanba - Yakshanba: 09:00 - 21:00
              </p>
              <p className="text-gray-600">
                Onlayn buyurtmalar 24/7 qabul qilinadi
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;