// NOTE: In production, these should be environment variables
// For demo purposes, they are hardcoded as specified in requirements
const BOT_TOKEN = '8554413508:AAEO0H1mA1aWkKxGpZ-PaLWQqysq0VH4Am0';
const CHAT_ID = '5414733748';

export const sendReceiptToTelegram = async (orderDetails, receiptImage) => {
  try {
    // Prepare the message text
    const message = `
🛒 Yangi buyurtma!
📦 Buyurtma raqami: ${orderDetails.orderId}
👤 Mijoz: ${orderDetails.customerName}
💰 Summa: ${orderDetails.total} so'm
📅 Sana: ${new Date().toLocaleString('uz-UZ')}
    
📋 Mahsulotlar:
${orderDetails.items.map(item => `• ${item.name} - ${item.quantity}x - ${item.price} so'm`).join('\n')}
    `;

    // Send text message
    const textUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await fetch(textUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    // If receipt image is provided, send it
    if (receiptImage) {
      const formData = new FormData();
      formData.append('chat_id', CHAT_ID);
      formData.append('photo', receiptImage);
      formData.append('caption', '✅ To\'lov cheki');

      const photoUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
      await fetch(photoUrl, {
        method: 'POST',
        body: formData
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return { success: false, error: error.message };
  }
};
