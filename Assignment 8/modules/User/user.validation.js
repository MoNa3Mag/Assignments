const Joi = require ("joi")


const profile = {
    headers : Joi.object().required().keys({
        authorization : Joi.string().required()
    }).optional({allowUnknown : true})
}

module.exports = {
    profile
}