# Web Cat - Mushuklar uchun do'kon 🐱

Web Cat - bu mushuklar uchun mahsulotlar sotish platformasi. Foydalanuvchilar ro'yxatdan o'tib, mahsulotlarni ko'rish, savatga qo'shish va buyurtma berish imkoniyatiga ega.

## Asosiy xususiyatlar

### Foydalanuvchi uchun:
- ✅ Ro'yxatdan o'tish va tizimga kirish
- 🛍️ Mahsulotlar katalogi (kategoriyalar bo'yicha filtrlash)
- 🛒 Savatcha funksiyasi
- 💳 To'lov sahifasi (karta raqami ko'rsatiladi)
- 📸 To'lov chekini Telegram botga yuborish
- 📦 Buyurtmalar tarixi
- ℹ️ Do'kon haqida ma'lumot

### Admin uchun:
- 👨‍💼 Admin panel
- ➕ Mahsulot qo'shish
- ✏️ Mahsulotni tahrirlash
- 🗑️ Mahsulotni o'chirish
- 📊 Buyurtmalarni ko'rish va holati bilan ishlash

## Texnologiyalar

- **Frontend**: React 19, React Router
- **Styling**: Tailwind CSS 4
- **Ma'lumotlar**: LocalStorage
- **Telegram**: Bot API integratsiyasi
- **Build Tool**: Vite

## O'rnatish va ishga tushirish

### 1. Loyihani klonlash
```bash
git clone https://github.com/webdunyosi/web-cat.git
cd web-cat
```

### 2. Bog'liqliklarni o'rnatish
```bash
npm install
```

### 3. Ishga tushirish (development)
```bash
npm run dev
```

Brauzerda `http://localhost:5173` da ochiladi.

### 4. Production uchun build qilish
```bash
npm run build
npm run preview
```

## Admin kirish ma'lumotlari

Dastur birinchi marta ishga tushganda avtomatik ravishda admin foydalanuvchi yaratiladi:

- **Email**: `admin@webcat.uz`
- **Parol**: `admin123`

## Telegram Bot integratsiyasi

Buyurtma berilganda va to'lov cheki yuklanganda, ma'lumotlar quyidagi Telegram botga yuboriladi:

- **Bot Token**: `8554413508:AAEO0H1mA1aWkKxGpZ-PaLWQqysq0VH4Am0`
- **Chat ID**: `5414733748`

## Sahifalar

### 1. Login / Register
Foydalanuvchilar ro'yxatdan o'tish yoki tizimga kirish mumkin.

### 2. Mahsulotlar
Barcha mahsulotlar ro'yxati. Kategoriyalar bo'yicha filtrlash mumkin:
- Ovqat
- O'yinchoqlar
- Aksessuarlar
- Gigiyena

### 3. Savatcha
Tanlangan mahsulotlar, miqdorni o'zgartirish, mahsulot o'chirish.

### 4. Checkout
- Buyurtma tafsilotlari
- Mijoz ma'lumotlari
- To'lov karta raqami
- To'lov chekini yuklash

### 5. Buyurtmalar
Foydalanuvchining barcha buyurtmalari tarixi.

### 6. Do'kon haqida
Do'kon haqida ma'lumot, aloqa ma'lumotlari, qanday xarid qilish yo'riqnomasi.

### 7. Admin Panel
Mahsulotlar va buyurtmalarni boshqarish.

## Loyihaning tuzilishi

```
web-cat/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── ProductCard.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── About.jsx
│   │   └── Admin.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── utils/
│   │   ├── telegramBot.js
│   │   └── initAdmin.js
│   ├── data/
│   │   └── products.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
└── package.json
```

## Muhim eslatmalar

⚠️ **Bu demo loyiha**:
- Ma'lumotlar LocalStorage'da saqlanadi
- Parollar hash qilinmagan (production uchun bcrypt ishlatish kerak)
- Haqiqiy to'lov tizimi yo'q (faqat demo karta raqami)
- Telegram bot token kodni ichida (production uchun environment variables ishlatish kerak)

## Kelajakdagi yaxshilanishlar

- [ ] Backend server (Node.js/Express)
- [ ] Haqiqiy database (MongoDB/PostgreSQL)
- [ ] Parol xeshlash (bcrypt)
- [ ] Haqiqiy to'lov tizimi integratsiyasi
- [ ] Email bildirishnomalar
- [ ] Mahsulot rasmlarini yuklash
- [ ] Qidiruv funksiyasi
- [ ] Foydalanuvchi profili
- [ ] Mahsulotlar reytingi va sharhlar

## Litsenziya

MIT

## Muallif

webdunyosi

## Aloqa

Savollar yoki takliflar uchun:
- Email: info@webcat.uz
- Telegram: [@webcat_support](https://t.me/webcat_support)
