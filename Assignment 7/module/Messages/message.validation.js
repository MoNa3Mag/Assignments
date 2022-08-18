const Joi = require("joi");


const sendMessgaes = {
    body : Joi.object().required().keys({

        messageBody : Joi.string().min(1).max(5000).required()
    }),
    params : Joi.object().required().keys({

       id : Joi.string().min(24).max(24).required()
    })

}

const deleteMessage = {
    params : Joi.object().required().keys({

       id : Joi.string().min(24).max(24).required()
    })

}



module.exports = {
    sendMessgaes,
    deleteMessage
}