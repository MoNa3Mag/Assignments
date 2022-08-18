const { roles } = require("../../midlwear/auth");

const endPoint = {
    profile : [roles.User , roles.Admin],
    updateProfile : [roles.User],
    deletedUser : [roles.User]


}

module.exports = endPoint