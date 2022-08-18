const userModel = require("../../../DB/model/User")

displayProfile = async(req,res)=>{

    const user = await userModel.findById(req.user._id)  
    res.json({message:"Done" , user})  

}

const updatUser = async (req,res)=>{

    const id = req.user._id;
    const {name , email} = req.body
    const updated = await userModel.findByIdAndUpdate(id , {name , email} , {new:true}).select("-password");
    
    if (updated) {
        res.json({message:"done" , updated})
    } else {
        res.json({message:"in-valid ID"})
    }
}


const deleteUser = async(req,res)=>{
    const id = req.user._id;
    const deleted = await userModel.findByIdAndDelete(id , {new : true}).select("-password");
    if (deleted) {
    res.json({message:"done" , deleted})
    } else {
        res.json({message:"email not found"})
    }
}

module.exports = {
    displayProfile,
    updatUser,
    deleteUser
}