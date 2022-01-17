const https = require('https');

const axios = require("axios").default.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

module.exports = {
    axios: axios
};