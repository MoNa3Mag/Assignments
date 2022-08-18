const validation = require("../../midlwear/Validation")
const authValidator = require("./auth.validation")
const signin = require("./controller/signin")
const signup = require("./controller/signup")

const router = require("express").Router()


router.post("/signup" , validation(authValidator.signUp) , signup)

router.post("/signin" , validation(authValidator.signin) , signin)



module.exports = router