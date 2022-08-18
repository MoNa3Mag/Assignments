const { Op } = require("sequelize");
const productModel = require("../../../DB/model/Product");

const getPrice = async (req,res)=>{
const price = await productModel.findAll({
    where:{
        price:{
            [Op.between]:[1000 , 3000]
        }
    }
})
res.json({message:"done" , price})
}

module.exports = getPrice;