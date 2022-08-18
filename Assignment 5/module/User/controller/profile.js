const userModel = require("../../../DB/model/user");

const updatUser = async (req,res)=>{

    const id = req.user._id;
    const {name , phone} = req.body
    const updated = await userModel.findByIdAndUpdate(id , {name , phone} , {new:true}).select("-password");
    
    if (updated) {
        res.json({message:"done" , updated})
    } else {
        res.json({message:"in-valid ID"})
    }
}




    const deleteUser = async(req,res)=>{
        console.log(req.user);
        const id = req.user._id;
        const deleted = await userModel.findByIdAndDelete(id , {new : true}).select("-password");
        // const deleted = await userModel.deleteOne();
        // await userModel.findById(id);
        if (deleted) {
        res.json({message:"done" , deleted})
        } else {
            res.json({message:"email not found"})
        }
    }
    const allUsers = async(req,res)=>{
       
            const userList = await userModel.find({}).select("-password")
            res.json({message:"done" , userList})
    }
    
    const userId = async(req,res)=>{

        const {id} = req.params;
        const userID = await userModel.findById(id)
        res.json({message:"done" , userID})
    }






module.exports = {
    updatUser ,
    allUsers ,
    userId ,
    deleteUser
}