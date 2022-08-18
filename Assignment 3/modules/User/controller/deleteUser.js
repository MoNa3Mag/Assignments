const userModel = require("../../../DB/model/User");

const deleteUser = async(req,res)=>{

    const {id} = req.params;
    const deleted = await userModel.destroy({where:{id}})

    res.json({message:"done" , deleted })

}

module.exports = deleteUser;