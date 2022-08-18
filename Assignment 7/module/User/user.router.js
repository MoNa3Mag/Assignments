const router = require("express").Router();
const { auth } = require("../../midlwear/auth");
const { displayProfile, updatUser, deleteUser, updateProfilePic, updateProfileCoverPic, allUsers } = require("./controller/profile");
const multerData = require ("../../services/multer")
const endPoint = require("./User.endPoint");

router.get('/user' , auth(endPoint.profile) , displayProfile)

router.patch('/updat' , auth(endPoint.updateProfile) , updatUser)

router.delete('/delete' , auth(endPoint.deletedUser) , deleteUser)

router.patch('/user/profile/pic' ,multerData.myMulter('users/profilePic' , multerData.validateFile.image).single("image") , auth(endPoint.profile) , updateProfilePic)

router.patch('/user/profile/coverPic' ,multerData.myMulter('users/profileCoverPic' , multerData.validateFile.image).array("image") , auth(endPoint.profile) , updateProfileCoverPic)

router.get("/allUser" , allUsers)




module.exports = router