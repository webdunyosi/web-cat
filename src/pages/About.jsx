import React from 'react';

const About = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <span className="text-5xl">🐱</span>
              <span>Web Cat</span>
            </h1>
            <p className="text-xl text-gray-600">Mushuklar uchun eng yaxshi do'kon</p>
          </div>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-purple-600 mb-3">Biz haqimizda</h2>
              <p className="leading-relaxed">
                Web Cat - bu mushuklar uchun yuqori sifatli mahsulotlar taqdim etuvchi onlayn do'kon. 
                Biz sizning sevimli uy hayvonlaringiz uchun eng yaxshi oziq-ovqat, o'yinchoqlar va 
                aksessuarlarni taklif etamiz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-purple-600 mb-3">Bizning afzalliklarimiz</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl mb-2">✨</div>
                  <h3 className="font-semibold mb-1">Sifatli mahsulotlar</h3>
                  <p className="text-sm">Faqat ishonchli brendlardan mahsulotlar</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl mb-2">🚚</div>
                  <h3 className="font-semibold mb-1">Tez yetkazib berish</h3>
                  <p className="text-sm">24-48 soat ichida yetkazib berish</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl mb-2">💳</div>
                  <h3 className="font-semibold mb-1">Qulay to'lov</h3>
                  <p className="text-sm">Turli to'lov usullari mavjud</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="font-semibold mb-3">Keng tanlov</h3>
                  <p className="text-sm">100+ dan ortiq mahsulotlar</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-purple-600 mb-3">Aloqa ma'lumotlari</h2>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="font-semibold">📞 Telefon:</span>
                  <span>+998 90 123 45 67</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">📧 Email:</span>
                  <span>info@webcat.uz</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">📍 Manzil:</span>
                  <span>Toshkent, Uzbekistan</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">⏰ Ish vaqti:</span>
                  <span>Dushanba - Yakshanba, 9:00 - 21:00</span>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-purple-600 mb-3">Qanday xarid qilish mumkin?</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Mahsulotlar sahifasidan kerakli mahsulotlarni tanlang</li>
                <li>Mahsulotlarni savatga qo'shing</li>
                <li>Savatcha orqali buyurtma bering</li>
                <li>Karta ma'lumotlariga to'lov qiling</li>
                <li>To'lov chekini Telegram botga yuboring</li>
                <li>Buyurtmangizni kuting!</li>
              </ol>
            </section>

            <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-lg text-center mt-8">
              <h3 className="text-2xl font-bold mb-2">Savollaringiz bormi?</h3>
              <p className="mb-4">Biz bilan bog'laning, yordam berishdan xursandmiz!</p>
              <a 
                href="https://t.me/webcat_support" 
                className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Telegram orqali bog'lanish
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
