const { Op } = require("sequelize")
const userModel = require("../../../DB/model/User")

const search_a = async(req,res)=>{
    const search = await userModel.findAll({
    where:{
        firstName:{
            [Op.or]:[
                {[Op.like]:"a%"},
                {[Op.like]:"%a"}
            ]
        }
    }
    })
    res.json({message:"Done" , search})
}

module.exports = search_a;