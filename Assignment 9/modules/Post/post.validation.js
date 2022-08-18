const Joi = require ("joi")

const createPost = {
    body : Joi.object().required().keys({
        text : Joi.string().optional()
    })
}

const like_unLikePost = {
    params : Joi.object().required().keys({
        id : Joi.string().min(24).max(24).required()
    })
}



module.exports = {
    createPost,
    like_unLikePost
}