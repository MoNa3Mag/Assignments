const { Roles } = require("../../Middlewares/auth");


const endPoint = {
    createComment  : [Roles.User , Roles.Admin]
}


module.exports = endPoint