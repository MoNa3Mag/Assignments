const productModel = require("../../../DB/model/product");
const userModel = require("../../../DB/model/user");

const updatProduct = async (req, res) => {
    const { id } = req.params;
    const {_id , title, Description } = req.body;
    const updatedOwner = await productModel.findById(id)
    const userTable = await userModel.findById(_id)
 
    if (userTable != null) {

        if (updatedOwner != null) {
        
            if ( updatedOwner.CreatedBy == userTable.id) {

                const updated = await productModel.findByIdAndUpdate(id, { title, Description }, { new: true });
                if (updated) {
                    res.json({ message: "Done", updated })
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

module.exports = updatProduct;