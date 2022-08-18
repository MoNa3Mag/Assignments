const productModel = require("../../../DB/model/product");


const updatProduct = async (req, res) => {

    const {id} = req.params;
    const {title , Description ,Price} = req.body;
    const findProduct = await productModel.findOne({_id : id , CreatedBy:req.user.id})
    if (findProduct) {
        const updated = await productModel.updateOne({_id:id} , {title , Description ,Price})
        res.json({message:"Done"})
    } else {
        res.json({message:"you are not the owner of the product"})
    }

}

module.exports = updatProduct;
