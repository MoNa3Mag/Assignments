const router = require ('express').Router();
const { auth } = require('../../Middlewares/auth');
const { validation } = require('../../Middlewares/validator');
const { myMulter, multerValidation } = require('../../Service/multer');
const postController = require("./Controller/Post");
const endPoint = require('./endPoint');
const validators = require ("./post.validation")



router.post("/" , myMulter("/post" , multerValidation.image).array('image' , 7) , validation(validators.createPost) , auth(endPoint.createPost) ,  postController.createPost)

router.patch("/:id/like_unlikePost" , validation(validators.like_unLikePost) , auth(endPoint.createPost) ,  postController.like_unlikePost)

router.get("/allPosts" ,  postController.allPosts)

module.exports = router