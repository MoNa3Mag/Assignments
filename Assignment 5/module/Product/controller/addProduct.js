const productModel = require("../../../DB/model/product");
const userModel = require("../../../DB/model/user");


const addProduct = async (req,res)=>{
    const {title , Description , Price} = req.body;
    const product = await productModel.insertMany({title , Description , Price , CreatedBy:req.user._id})
         res.json({message:"Done" ,product})
}




module.exports = addProduct;