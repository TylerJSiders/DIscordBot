const axios = require('../constants/axiosSetup').axios;
const baseUrl = require('../constants/stringConstants').baseUrl;

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

module.exports = {
    createUser: createUser
}