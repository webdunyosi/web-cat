const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export const sendOrderToTelegram = async (orderData) => {
  const message = formatOrderMessage(orderData);
  
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Telegramga yuborishda xatolik');
    }

    return { success: true };
  } catch (error) {
    console.error('Telegram xatolik:', error);
    return { success: false, error: error.message };
  }
};

const formatOrderMessage = (orderData) => {
  const { orderId, items, total, customerName, phone, cardNumber } = orderData;
  
  let message = `<b>🛒 Yangi Buyurtma #${orderId}</b>\n\n`;
  message += `<b>👤 Mijoz:</b> ${customerName}\n`;
  message += `<b>📱 Telefon:</b> ${phone}\n\n`;
  
  message += `<b>📦 Mahsulotlar:</b>\n`;
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} x ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} so'm\n`;
  });
  
  message += `\n<b>💰 Jami:</b> ${total.toLocaleString()} so'm\n`;
  message += `<b>💳 Karta raqami:</b> ${cardNumber}\n\n`;
  message += `⏰ Sana: ${new Date().toLocaleString('uz-UZ')}`;
  
  return message;
};
