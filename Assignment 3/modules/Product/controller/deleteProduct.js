const productModel = require("../../../DB/model/Product");

const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    const {userId} = req.body;

    const deletedOwner = await productModel.findOne({where:{id}});
    if (deletedOwner.userId == userId) {
        const product = await productModel.destroy({
            where:{id}
        })

        res.json({message:"Done" , product})
    } else {
        res.json({message:"you are not the owner of the product"})
    }




  
}


module.exports = deleteProduct;