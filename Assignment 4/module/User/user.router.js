const auth = require("../../middlwear/auth");
const { updatUser, allUsers, userId, deleteUser, softDelet } = require("./controller/profile");
const { signup, signin } = require("./controller/registration");

const router = require("express").Router();


router.post("/signup" , signup)

router.post("/signin" , signin)

router.patch("/user" , auth() ,  updatUser)

router.delete("/user" , auth() , deleteUser)

router.get("/user" , allUsers)

router.get("/user/:id" , userId)

router.delete("/deleted" , auth() , softDelet)





module.exports = router;