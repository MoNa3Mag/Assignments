const { auth } = require("../../midlwear/auth")
const validation = require("../../midlwear/Validation")
const { sendMessage, getMessages, deletedMessage } = require("./controller/messages")
const endPoint = require("./message.endPoint")
const messageValidators = require("./message.validation")


const router = require("express").Router()


router.post("/message/:id" , validation(messageValidators.sendMessgaes) , sendMessage)

router.get("/message" , auth(endPoint.getProfileMessages) , getMessages)

router.delete("/message/:id" ,validation(messageValidators.deleteMessage) ,  auth(endPoint.getProfileMessages) , deletedMessage)



module.exports = router