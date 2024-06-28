const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const messages = [
    "Messaggio 1",
    "Messaggio 2",
    "Messaggio 3",
    "Messaggio 4",
    "Messaggio 5"
];

const chatId = process.env.TELEGRAM_CHAT_ID;

let messageIndex = 0;

setInterval(() => {
    if (messageIndex < messages.length) {
        bot.sendMessage(chatId, messages[messageIndex])
            .then(() => console.log(`Message sent: ${messages[messageIndex]}`))
            .catch(err => console.error(`Failed to send message: ${err}`));
        messageIndex++;
    } else {
        messageIndex = 0;
    }
}, 5 * 60 * 1000);

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Il bot è attivo e invierà messaggi programmati ogni 5 minuti.");
    console.log('Received /start command');
});

bot.on("polling_error", console.error);
