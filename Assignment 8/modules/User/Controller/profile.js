const userModel = require("../../../DB/Model/User");
const jwt = require ("jsonwebtoken")
const bcrybt = require("bcryptjs")
const sendEmail = require("../../../Service/sendEmail");

const deActivate = async (req , res)=>{
try {
    const {email} = req.user;
    const findUser = await userModel.findOneAndUpdate({email} , {deActivated : true} , {new : true})
    res.status(201).json({message : "Done"})
} catch (error) {
    res.status(500).json({message:"Catch Error" , error})
    console.log(error);   
}
}

const blokAccount = async (req , res)=>{
    try {
        const {email} = req.body;
        const findUser = await userModel.findOneAndUpdate({email} , {isBlooked : true} , {new : true})
        res.status(201).json({message : "Bloked"})
    } catch (error) {
        res.status(500).json({message:"Catch Error" , error})
        console.log(error);   
    }
    }

const updateProfile = async (req , res)=>{
    try {
        const {email} = req.user
        const {newEmail , userName , password} = req.body;
        const findUser = await userModel.findOne({email})
        if (findUser) {
            const match = bcrybt.compare(password , findUser.password)
            if (match) {
                const user = await userModel.findOneAndUpdate({email} , {email : newEmail , password : password , userName:userName});
                const token = jwt.sign({id:user._id , email :user.email , role : user.role } , process.env.emailTokenSecreat , {expiresIn : 5*60})
                const URL = `${req.protocol}://${req.headers.host}/api/v1/user/confirmEmail/${token}`
                const message = `<a href= '${URL}'>Click here to confirm'</a>`
                await sendEmail(user.email , message)
                res.status(200).json({message:"updated" , user})
            } else {
                res.status(404).json({message:"sorry, not match"})
            }
        } else {
        res.status(404).json({message:"email is not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Catch Error" , error})
        console.log(error);   
    }
}


module.exports = {
    deActivate,
    blokAccount,
    updateProfile
}