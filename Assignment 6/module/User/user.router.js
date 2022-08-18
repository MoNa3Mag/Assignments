const router = require("express").Router();
const { auth } = require("../../midlwear/auth");
const { displayProfile, updatUser, deleteUser } = require("./controller/profile");
const endPoint = require("./User.endPoint");

router.get('/user' , auth(endPoint.profile) , displayProfile)

router.patch('/updat' , auth(endPoint.updateProfile) , updatUser)

router.delete('/delete' , auth(endPoint.deletedUser) , deleteUser)





module.exports = router