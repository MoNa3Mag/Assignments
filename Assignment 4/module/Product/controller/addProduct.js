const productModel = require("../../../DB/model/product");
const userModel = require("../../../DB/model/user");

const addProduct = async (req,res)=>{


    const {title , Description , Price , CreatedBy} = req.body;
    const user = await userModel.findOne({_id:CreatedBy})
    if (user) {
        const product = await productModel.insertMany({title , Description , Price , CreatedBy})
    
        if (product) {
         res.json({message:"Done" ,product})
        } else {
            res.json({message:"catch error" , error:error.name})
        }
    } else {
        res.json({message:"not user"})
    }
    
  
}
module.exports = addProduct;