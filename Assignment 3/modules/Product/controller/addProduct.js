const productModel = require("../../../DB/model/Product");


const addProduct = async (req,res)=>{
   try {
    const {title , Description , userId , Price} = req.body;

    const createdProduct = await productModel.create({title , Description , userId , Price});
    res.json({message:"Done" , createdProduct})
   } catch (error) {
       res.json({message:"catch error" , error:error.name})
   }
}

module.exports = addProduct