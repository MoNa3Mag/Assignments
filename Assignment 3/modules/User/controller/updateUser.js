const userModel = require("../../../DB/model/User");

const updateUser = async (req,res)=>{

    const {id} = req.params;
    const {firstName , lastName , email , password , age} = req.body;
    const updated = await userModel.update({firstName , lastName , email , password , age} ,{
        where:{id}
    })
    if (updated[0]) {
        res.json({message:"Done" , updated})
    } else {
        res.json({message:"something went wrong" , updated})
    }
}

module.exports = updateUser;