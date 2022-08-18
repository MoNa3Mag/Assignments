const productModel = require("../../../DB/model/Product")
const userModel = require("../../../DB/model/User")

const product = async(req,res)=>{
try {
    const productArr = await productModel.findAll({
        include:[{
            model : userModel,
            attributes:['firstName' , 'lastName' , 'email' , 'age']
        }]
    })
    res.json({message:"Done" , product:productArr})
} catch (error) {
    res.json({message:"catch error" , error:error.name})
}
}

module.exports = {
    product
}