const discord = require('discord.io');
const tokenConstant = require('./token.constant');
const cron = require("cron").CronJob;

var bot = new discord.Client({
    autorun: true,
    token: tokenConstant.AUTH_TOKEN
});





bot.on('ready', () => {
    console.log("Bot is ready");
})



var FiveMinuteJoke = new cron(
    '0 0 * * * * ',
    function () {
        bot.sendMessage({
            to: "918329606644334624",
            message: "Test Message",
        });
    },
    null,
    true,
    "America/New_York"
);