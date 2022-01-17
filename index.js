const https = require('https');
const discord = require('discord.io');
const tokenConstant = require('./token.constant');
const cron = require("cron").CronJob;

const axios = require("axios").default.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

const baseUrl = 'https://localhost:7140';

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
            createUser(userId, userName);
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

//Functions
function createUser(userId, userName) {
    let userModel = {
        id: userId,
        userName: userName
    };

    axios.post(`${baseUrl}/api/users`, userModel).then((result) => {
        //Do Nothing at the moment
        //TODO add a welcome message for first posters
    }, () => {
        console.log("An Error has happened.");
    });
}