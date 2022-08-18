const validation = require("../../midlwear/Validation")
const authValidator = require("./auth.validation")
const signin = require("./controller/signin")
const signup = require("./controller/signup")
const multerData = require ("../../services/multer")

const router = require("express").Router()


router.post("/signup" , multerData.myMulter('users/profilePic' , multerData.validateFile.image).single("image") , validation(authValidator.signUp) , signup)

router.post("/signin" , validation(authValidator.signin) , signin)



module.exports = router