const dataMethod = ['body' , 'params' , 'query' , 'headers']

const validation = (schema)=>{
    return (req,res,next)=>{
       const  validatioErrorArr = []
        dataMethod.forEach(key=>{
            if (schema[key]) {
                const validationResuit = schema[key].validate(req[key] , {abortEarly : false}) 
                if (validationResuit.error) {
                    validatioErrorArr.push(validationResuit.error.details)
                } 
            }
        })
        if (validatioErrorArr.length) {
            res.json({message:"Validatio error" , error:validatioErrorArr})
        } else {
            next()
        }
    }
}

module.exports = validation


