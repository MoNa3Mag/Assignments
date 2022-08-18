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

updateProfilePic = async(req,res)=>{

    if (req.imageError) {
        res.json({message:"in-valid format"})
    } else {
        const imageUrl = `${req.protocol}://${req.headers.host}/${req.destinationFile}/${req.file.filename}`
        console.log(req.destinationFile);
    const user = await userModel.findOneAndUpdate({_id : req.user._id} , {profilePic : imageUrl}  , {new : true })
    res.json({message:"Done" , user})  

    }
}



updateProfileCoverPic = async(req,res)=>{
    if (req.imageError) {
        res.json({message:"in-valid format"})
    } else {

        const imageUrls = []

        for (let i = 0; i < req.files.length; i++) {
        imageUrls.push(`${req.protocol}://${req.headers.host}/${req.destinationFile}/${req.files[i].filename}`)    }
        const user = await userModel.findOneAndUpdate({_id : req.user._id} , {coverPic : imageUrls}  , {new : true })
        res.json({message:"Done" ,user})  
    }
    }

const allUsers = async(req,res)=>{
       
        const userList = await userModel.find({}).populate({
            path : "messagesArray",
            select : "messageBody"
        })
        res.json({message:"done" , userList})
}

module.exports = {
    displayProfile,
    updatUser,
    deleteUser,
    updateProfilePic,
    updateProfileCoverPic,
    allUsers
}