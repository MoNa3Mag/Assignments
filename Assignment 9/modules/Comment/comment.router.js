const { validation } = require("../../Middlewares/validator");
const validator = require("./comment.validators")
const endPoint = require("./comment.endPoint");
const controller = require ("./Controller/Comment");
const { auth } = require("../../Middlewares/auth");

const router = require ("express").Router();


router.post ("/:id/createComment" , validation(validator.createComment) , auth(endPoint.createComment) , controller.createComment)

router.patch("/:id/likePost" , validation(validator.likeComment) , auth(endPoint.createComment) ,  controller.likeComment)

router.patch("/:id/comment/:commentID" , validation(validator.replayComment) , auth(endPoint.createComment) , controller.rplayComment)


module.exports = router