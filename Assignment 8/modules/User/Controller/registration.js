const userModel = require("../../../DB/Model/User");
const sendEmail = require("../../../Service/sendEmail");
const jwt = require ("jsonwebtoken")
const openURL = require("openurl")
const bcrybt = require("bcryptjs")


const signup = async (req ,res) =>{
try {
    
    const {userName , password , email , age , gender} = req.body;
    const newUser = new userModel({userName , password , email , age , gender});
    const saveUser = await newUser.save();
    const token = jwt.sign({id:saveUser._id , email :saveUser.email , role : saveUser.role } , process.env.emailTokenSecreat , {expiresIn : 5*60})
    const URL = `${req.protocol}://${req.headers.host}/api/v1/user/confirmEmail/${token}`
    const message = `<a href= '${URL}'>Click here to confirm'</a>`
    await sendEmail(saveUser.email , message)
    res.status(201).json({message:"Done" , saveUser})
} catch (error) {
    if (error.keyValue?.email) {
        res.status(404).json({message:"email exist" , error})
    }
    res.status(500).json({message:"Catch Error" , error})
    console.log(error);
}
}

const confirm = async(req,res)=>{
try {
    const {token} = req.params
if (!token || token == null || token == undefined) {
    res.status(403).json({message:"in-valid email token"})
} else {
    const decoded = jwt.verify(token , process.env.emailTokenSecreat)
    if (!decoded) {
    res.status(400).json({message:"in-valid decoded token"})
    } else {
        const findUser = await userModel.findById(decoded.id).select('confirmEmail')
        if (!findUser) {
            res.status(400).json({message:"in-valid account"})
        } else {
            if (findUser.confirmEmail) {
            res.status(400).json({message:"Account already confirmed plz login"})
            }else{
                await userModel.findOneAndUpdate({_id : findUser._id} , {confirmEmail : true} , {new : true})
                res.status(200).json(openURL.open('confirmPage.html'))
            }
        }
    }
}
} catch (error) {
    res.status(500).json({message:"Catch Error" , error})
    console.log(error);
}
}

const signin = async(req , res)=>{
try {
    const {email , password} = req.body;
    const checkUser = await userModel.findOne({email , confirmEmail : true , isBlooked : false})
    if (checkUser) {
        const match = bcrybt.compare(password , checkUser.password)
        if (match) {
            const tokeen = jwt.sign({_id : checkUser._id , email : email , role : checkUser.role} , process.env.emailTokenSecreat)
            await userModel.findOneAndUpdate({email} , {onLine : true})
    res.status(200).json({message:"Done" , tokeen : tokeen})
        } else {
    res.status(404).json({message:"password is not matching" , error})
        }
    } else {
    res.status(404).json({message:"not found email" , error})
    }
} catch (error) {
    res.status(500).json({message:"Catch Error" , error})
    console.log(error);
}
}

const signOut = async (req , res)=>{
    try {
        const {email} = req.user;
        const findUser = await userModel.findOneAndUpdate({email} , {lastSeen : Date.now() , onLine : false} , {new : true})
        res.status(201).json({message : "signOut"})
    } catch (error) {
        res.status(500).json({message:"Catch Error" , error})
        console.log(error);   
    }
}


module.exports = {
    signup,
    confirm,
    signin,
    signOut
}