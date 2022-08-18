const Joi = require("joi")

const addProducts = {
    body : Joi.object().required().keys
    ({
        title : Joi.string().min(1).max(100000).required().messages({
            'string.base':"sorry title must follow string char only",
            'string.empty':'plz fill u title',
            'any.required':'please enter u title'
        }),
        Description: Joi.string().min(1).max(50000).required().messages({
            'string.base': "sorry Description must follow string char only",
            'string.empty': 'plz fill u Description',
            'any.required': 'please enter u Description'
        }),
        Price : Joi.string().required().messages({'any.required': 'please enter u Description'})
    })
}

const updateProduct = {
    body : Joi.object().required().keys
    ({
        title : Joi.string().min(1).max(100000).required().messages({
            'string.base':"sorry title must follow string char only",
            'string.empty':'plz fill u title',
            'any.required':'please enter u title'
        }),
        Description: Joi.string().min(1).max(50000).required().messages({
            'string.base': "sorry Description must follow string char only",
            'string.empty': 'plz fill u Description',
            'any.required': 'please enter u Description'
        }),
        Price : Joi.string().required().messages({'any.required': 'please enter u Description'})
    })
}

module.exports = {
    addProducts,
    updateProduct
}