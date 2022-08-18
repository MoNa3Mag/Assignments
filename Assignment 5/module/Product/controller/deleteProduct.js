const productModel = require("../../../DB/model/product");

const deleteProduct = async(req,res)=>{

    const {id} = req.params;
    const findProduct = await productModel.findOne({_id : id , CreatedBy:req.user.id})
    if (findProduct) {
        const deleted = await productModel.deleteOne({_id:id})
        res.json({message:"Done"})
    } else {
        res.json({message:"you are not the owner of the product"})
    }

    
}

module.exports = deleteProduct;