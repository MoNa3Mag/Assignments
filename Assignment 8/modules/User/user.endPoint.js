const { Roles } = require("../../Middlewares/auth");

const endPoint = {

    sendEmailtoMul : [Roles.Admin],
    signout : [Roles.User],
    blokAccount : [Roles.Admin]
}

module.exports = endPoint