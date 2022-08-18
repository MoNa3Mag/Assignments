const router = require ("express").Router();
const { auth } = require("../../Middlewares/auth");
const controller = require ('./Controller/registration');
const profile = require ("./Controller/profile")
const validators = require ("./user.validation")
const { sendEmailtoMultipleUser } = require("./Controller/sendEmailtoMultipl");
const endPoint = require("./user.endPoint");
const { myMulter, multerValidation } = require("../../Service/multer");
const { validation } = require("../../Middlewares/validator");


router.post ('/signup' , controller.signup)

router.get("/confirmEmail/:token" , controller.confirm)

router.post("/signin" , controller.signin)

router.get ("/sendEmails" , auth(endPoint.sendEmailtoMul) , sendEmailtoMultipleUser)

router.post("/signout" , auth(endPoint.signout) , controller.signOut)

router.post("/deActivate" , auth(endPoint.signout) , profile.deActivate)

router.post ("/blokAccount" , auth(endPoint.blokAccount) , profile.blokAccount)

router.patch("/updateProfile" , auth(endPoint.signout) , profile.updateProfile)

router.patch("/profilePic/pic" , myMulter('user/profile/profilePic' , multerValidation.image).single('image') , auth(endPoint.signout) , profile.profilePic)

router.patch("/coverPic/pic" , myMulter('user/profile/coverPic' , multerValidation.image).array('image' , 15) , auth(endPoint.signout) , profile.coverPic)

router.patch("/profile/password" , auth(endPoint.signout) , validation(validators.updatePassword) , profile.updatePass)

router.post("/sendCode" , controller.sendCode)

router.get("/refreshToken/:id" , controller.refreshToken)

router.patch("/forrgetPassword" , validation(validators.forgetPassword) , controller.forrgetPassword)

router.get("/getAll" , profile.allUsers)

module.exports = router;