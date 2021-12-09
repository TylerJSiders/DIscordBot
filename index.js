const discord = require('discord.io');
const tokenConstant = require('./token.constant');

var bot = new discord.Client({
    autorun: true,
    token: tokenConstant.AUTH_TOKEN
});

bot.on('ready', () => {
    console.log("Bot is ready");
})