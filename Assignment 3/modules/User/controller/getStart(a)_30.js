
const {Op} = require("sequelize");

const userModel = require("../../../DB/model/User");

const search_a_30 = async(req,res)=>{

    
    const search = await userModel.findAll({
        where:{ 
             [Op.and]:{
                firstName:{[Op.like]:'a%'},
                age:{[Op.gt]:30}
            } 
        }
    })
    res.json({message:"Done" , search})
}

module.exports = search_a_30;