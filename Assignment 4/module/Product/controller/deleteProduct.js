const productModel = require("../../../DB/model/product");
const userModel = require("../../../DB/model/user");

const deleteProduct = async(req,res)=>{

    const {id} = req.params;
    const {_id} = req.body;
    
    const deletedOwner = await productModel.findById(id);
    const usrtTable = await userModel.findById(_id)

    if (usrtTable != null) {
        
        if (deletedOwner != null) {

            if (deletedOwner.CreatedBy == usrtTable.id) {
                
            const deleted = await productModel.findByIdAndDelete(id , {new : true});
            if (deleted) {
                res.json({ message: "Done", deleted })
            } else {
                res.json({ message: "in-valid ID" })
            }

            } else {
                res.json({ message: "you are not the owner" })
            }
            
        } else {
            res.json({ message: "you are not the owner of the product" })
        }

    } else {
        res.json({ message: "not found user" })
    }
    
    
}

module.exports = deleteProduct;