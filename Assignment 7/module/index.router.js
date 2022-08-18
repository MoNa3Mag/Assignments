const userRouter = require("./User/user.router");
const messageRouter = require("./Messages/message.router");
const authRouter = require("./Auth/auth.router")



module.exports = {
    userRouter,
    messageRouter,
    authRouter
}