const { Roles } = require("../../Middlewares/auth");


const endPoint = {
    createPost  : [Roles.User , Roles.Admin]
}


module.exports = endPoint