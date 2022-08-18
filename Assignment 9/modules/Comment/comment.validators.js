const Joi = require ("joi")

const createComment = {
    body : Joi.object().required().keys({
        text : Joi.string().optional()
    }),
    params : Joi.object().required().keys({
        id : Joi.string().min(24).max(24).required()
    })
}

const likeComment = {
    params : Joi.object().required().keys({
        id : Joi.string().min(24).max(24).required()
    })
}

const replayComment = {
    body : Joi.object().required().keys({
        text : Joi.string().optional()
    }),
    params : Joi.object().required().keys({
        id : Joi.string().min(24).max(24).required(),
        commentID : Joi.string().min(24).max(24).required()
    })
}



module.exports = {
    createComment,
    likeComment,
    replayComment
}