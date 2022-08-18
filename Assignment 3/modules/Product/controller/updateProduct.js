const productModel = require("../../../DB/model/Product");

const updateProduct = async (req,res)=>{


    const {id} = req.params;
    const {title  , Description , Price , userId} = req.body;
    const findProduct = await productModel.findOne({ where:{ id } });
    if (findProduct.userId == userId) {
        const Product = await productModel.update({title , Description , Price} , {
            where:{id}
        }) 
    
       if (Product[0]) {
        res.json({message:"Done" , Product })
       } else {
        res.json({message:"something went wrong" , Product })
       }
    } else {
        res.json({message:"you are not the owner of the product"})
    }

} 

module.exports = updateProduct;