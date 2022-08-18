const Joi = require ("joi")


const profile = {
    headers : Joi.object().required().keys({
        authorization : Joi.string().required()
    }).optional({allowUnknown : true})
}

const signUp = {

    body: Joi.object().required().keys({
        userName: Joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).messages({
            'any.required':"plz send u userName"
        }),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cPassword: Joi.string().valid(Joi.ref('password')).required(),
        age: Joi.number().min(18).required(),
        gender:Joi.valid('Male','Female').required()
    })
}

const confirmEmail = {

    params: Joi.object().required().keys({
        token:Joi.string().required()
    })
}

const signin = {

    body: Joi.object().required().keys({
  
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
     
    })
}

const updatePassword = {

    body: Joi.object().required().keys({
   
        oldPassword: Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        newPassword: Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
    })
}




const forgetPassword = {

    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        newPassword: Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
        code: Joi.number().required(),
    })
}






module.exports = {
    profile,
    signUp,
    confirmEmail,
    signin,
    updatePassword,
    forgetPassword
}