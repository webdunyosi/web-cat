# Web Cat - Mushuklar Onlayn Do'koni

Web Cat - bu mushuklar va ularning egalariga mo'ljallangan mahsulotlarni sotuvchi onlayn do'kon platformasi.

## Xususiyatlari

### Foydalanuvchi Paneli
- 🛍️ Mahsulotlarni ko'rish va filterlash
- 🛒 Savatga qo'shish va buyurtma berish
- 📦 Buyurtmalar tarixi
- ℹ️ Do'kon haqida ma'lumot

### Admin Paneli
- 📊 Dashboard statistikasi
- 🛍️ Mahsulotlarni boshqarish
- 📦 Buyurtmalarni kuzatish
- 👥 Foydalanuvchilarni boshqarish

### Telegram Bot Integratsiyasi
- Buyurtma ma'lumotlari avtomatik ravishda Telegram botga yuboriladi
- To'lov cheki va buyurtma tafsilotlari

## O'rnatish

1. Repozitoriyani klonlash:
```bash
git clone https://github.com/webdunyosi/web-cat.git
cd web-cat
```

2. Bog'liqliklarni o'rnatish:
```bash
npm install
```

3. Environment o'zgaruvchilarini sozlash:
`.env.example` faylini `.env` ga nusxalash va quyidagi qiymatlarni to'ldirish:
```
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_TELEGRAM_CHAT_ID=your_chat_id
VITE_PAYMENT_CARD_NUMBER=your_card_number
```

4. Dasturni ishga tushirish:
```bash
npm run dev
```

## Texnologiyalar

- **Frontend**: React 19, React Router
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Data Storage**: JSON files, localStorage
- **Telegram Integration**: Telegram Bot API

## Foydalanish

### Demo Akkountlar

**Admin:**
- Username: `admin`
- Password: `admin123`

**Foydalanuvchi:**
Ro'yxatdan o'tish orqali yangi akkaunt yarating.

## Xavfsizlik Eslatmalari

⚠️ **Muhim**: Bu demo loyiha bo'lib, quyidagi xavfsizlik muammolari mavjud:
- Parollar plaintext formatda saqlanadi (production uchun bcrypt/Argon2 ishlatish kerak)
- Autentifikatsiya localStorage orqali amalga oshiriladi (production uchun JWT/session cookie ishlatish kerak)
- Ma'lumotlar JSON fayllarda saqlanadi (production uchun real database ishlatish kerak)
- Backend API yo'q (production uchun to'liq backend kerak)

**Production uchun tavsiyalar:**
1. Backend API yarating (Node.js/Express, NestJS, yoki boshqa)
2. Ma'lumotlar bazasini ulang (PostgreSQL, MongoDB, va boshqalar)
3. Parollarni hash qiling (bcrypt, Argon2)
4. JWT yoki session-based autentifikatsiya ishlatish
5. HTTPS ishlatish
6. Input validatsiyasini backend tomonida ham amalga oshirish
7. Rate limiting va CORS sozlamalarini qo'shish
8. Environment o'zgaruvchilarini xavfsiz saqlash

## Litsenziya

MIT

## Muallif

webdunyosi

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
