const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
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
}, 2 * 60 * 1000);

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Il bot è attivo e invierà messaggi programmati ogni 2 minuti.");
    console.log('Received /start command');
});

bot.on("polling_error", console.error);

// Server HTTP per rispondere ai ping di UptimeRobot
app.get("/", (req, res) => {
    res.send("Il bot è attivo!");
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server avviato sulla porta ${listener.address().port}`);
});
