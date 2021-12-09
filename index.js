const discord = require('discord.io');
const tokenConstant = require('./token.constant');
const cron = require("cron").CronJob;
const axios = require("axios").default;

var bot = new discord.Client({
    autorun: true,
    token: tokenConstant.AUTH_TOKEN
});

bot.on('ready', () => {
    console.log("Bot is ready");

});

var HourlyJoke = new cron(
    '0 0 7-23 * * * ',
    function () {
        axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist&type=twopart").then((result) => {
            var CHANNELID = "918348732121100318";

            bot.sendMessage({
                to: CHANNELID,
                message: "Setup: " + result.data.setup
            });

            bot.sendMessage({
                to: CHANNELID,
                message: "Punchline: " + result.data.delivery,
            });
        });
    },
    null,
    true,
    "America/New_York"
);