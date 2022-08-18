const multer = require ("multer");
const {nanoid} = require ("nanoid")
const fs = require('fs')
const path = require("path")
const validateFile = {
    image : ['image/jpg' , 'image/jpeg' , 'image/png'],
    textFile : ['application/pdf']

}
function myMulter(customPath , validateType){
    if (!customPath || customPath == null || customPath == undefined) {
        customPath = 'generalFolder'
    }

    if (!fs.existsSync(path.join(__dirname , `../uploads/${customPath}`))) {
        fs.mkdirSync(path.join(__dirname , `../uploads/${customPath}`) , {recursive : true})
    }
    // if (fs.existsSync(path.join(__dirname , `../uploads/${customPath}`))) {
    //     fs.unlinkSync(path.join(__dirname , `../uploads/${customPath}`));
    // }

    const storage = multer.diskStorage({
        destination : function(req , file , cb){
            req.destinationFile =`uploads/${customPath}`
            cb(null , path.join(__dirname , `../uploads/${customPath}`))
        } , 
        filename : function(req , file , cb){
            console.log(file);
            const fullFileName = nanoid() + "_" + file.originalname
            cb(null , fullFileName)
        }
    })

    const fileFilter = function(req , file , cb){
        if (validateType.includes(file.mimetype)) {

            cb(null , true)
            
        } else {
            req.imageError = true
            cb (null, false , req.imageError)
        }
    }

    const upload = multer({dest : path.join(__dirname , `../uploads/${customPath}`) , fileFilter , storage})

    return upload
}


module.exports = {myMulter,
    validateFile}

