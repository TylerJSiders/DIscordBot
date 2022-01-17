const discord = require('discord.io');
const tokenConstant = require('./constants/token.constant');
const cron = require("cron").CronJob;
const userService = require('./services/userFunctions');
const axios = require('./constants/axiosSetup').axios;
const baseUrl = require('./constants/stringConstants').baseUrl;

var bot = new discord.Client({
    autorun: true,
    token: tokenConstant.AUTH_TOKEN
});


//Timed and Event Triggers
bot.on('ready', () => {
    console.log("Bot is Ready");
});

bot.on('message', (userName, userId, channelId, message) => {
    axios.get(`${baseUrl}/api/users/${userId}/exists`).then((response) => {
        if (!response.data) {
            userService.createUser(userId, userName);
        }
    });
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