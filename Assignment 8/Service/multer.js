const multer = require ("multer")
const path = require ("path")
// const nanoid = require ("nanoid")
const fs = require ("fs")

const fileValidation = {
    image : ['image/png' , 'image/jpeg' ,'image/jif' ],
    pdf : ['application/pdf' ]
}


function myMulter (customPath , customValidaion){

    if (!customPath || customPath == null) {
        customPath = 'general'
    }

    const fullPath = path.join(__dirname , `../Uploads${customPath}`)
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath , {recursive : true})
    }
    const storage = multer.diskStorage({
        destination : function (req , file ,cb){
            req.finalDistination = 'Uploads'
            cb : (null , fullPath)
        },
        filename : function (req ,file ,cb){
            cb : (null , nanoid()+ "_" + file.originalname)
        }
    })
    const fileFilter = function (req , file , cb){
        if (customValidaion.includes(file.mimetype)) {
            cb(null , true)
            
        } else {
            req.filErr = true
            cb(null , false)
        }
    }

    const upload = multer({dest : fullPath , fileFilter , storage})
    return upload

}

module.exports = {
    myMulter,
    fileValidation}