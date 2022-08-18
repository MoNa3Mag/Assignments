const { roles } = require("../../midlwear/auth");

const endPoint = {
    getProfileMessages : [
        roles.Admin,
        roles.User
    ]
}

module.exports = endPoint