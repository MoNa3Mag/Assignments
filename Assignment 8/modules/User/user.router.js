const router = require ("express").Router();
const { auth } = require("../../Middlewares/auth");
const controller = require ('./Controller/registration');
const profile = require ("./Controller/profile")
const { sendEmailtoMultipleUser } = require("./Controller/sendEmailtoMultipl");
const endPoint = require("./user.endPoint");


router.post ('/signup' , controller.signup)

router.get("/confirmEmail/:token" , controller.confirm)

router.post("/signin" , controller.signin)

router.get ("/sendEmails" , auth(endPoint.sendEmailtoMul) , sendEmailtoMultipleUser)

router.post("/signout" , auth(endPoint.signout) , controller.signOut)

router.post("/deActivate" , auth(endPoint.signout) , profile.deActivate)

router.post ("/blokAccount" , auth(endPoint.blokAccount) , profile.blokAccount)

router.patch("/updateProfile" , auth(endPoint.signout) , profile.updateProfile)




module.exports = router;