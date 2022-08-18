const auth = require("../../middlwear/auth");
const validation = require("../../middlwear/validation");
const { updatUser, allUsers, userId, deleteUser} = require("./controller/profile");
const { signup, signin } = require("./controller/registration");
const { signupValidation, signinValidation, updateValidation, userById } = require("./User.validation");

const router = require("express").Router();


router.post("/signup/:flag" , validation(signupValidation) , signup)

router.post("/signin" , validation(signinValidation) , signin)

router.patch("/user" , validation(updateValidation) , auth() ,  updatUser)

router.delete("/user" , auth() , deleteUser)

router.get("/user" , allUsers)

router.get("/user/:id" , validation(userById) , userId)





module.exports = router;