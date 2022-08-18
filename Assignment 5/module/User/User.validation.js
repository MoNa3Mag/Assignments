const Joi = require('joi');


const signupValidation = {
    body : Joi.object().required().keys({
        name :Joi.string().required().messages({
            'string.base':"sorry name must follow string char only",
            'string.empty':'plz fill u name',
            'any.required':'please enter u name'
        }),
        email : Joi.string().email().required().messages({ "string.email":"email must be a valid emai"}),
        password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({"string.pattern.base":"password fails to match the required pattern"}),
        cpassword : Joi.ref('password'),
        phone : Joi.number().required()
    }),
    params : Joi.object().required().keys({
        flag : Joi.boolean().truthy('yes').falsy('no').sensitive().required()
    }),
    query : Joi.object().required().keys({
        qflag : Joi.boolean()
    })

}


const signinValidation = {
    body : Joi.object().required().keys({
        email : Joi.string().email().required().messages({ "string.email":"email must be a valid emai"}),
        password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({"string.pattern.base":"password fails to match the required pattern"})
    })
}

const updateValidation = {
    body : Joi.object().required().keys({
        name : Joi.string().min(3).max(30).required().messages({
            'string.base':"sorry name must follow string char only",
            'string.empty':'plz fill u name',
            'any.required':'please enter u name'
        }),
        phone : Joi.number().required().messages({"number.base":'phone must be a number'})
    })
}

const userById = {
    params : Joi.object().required().keys({
        id : Joi.string().min(24).max(24).required().messages({
            "string.min":"id length must be at least 24 characters long",
            "string.max":"id length must be less than or equal to 24 characters long"
        })
    })
}




module.exports = {
    signupValidation,
    signinValidation,
    updateValidation,
    userById
}