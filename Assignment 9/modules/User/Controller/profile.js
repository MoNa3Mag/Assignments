const userModel = require("../../../DB/Model/User");
const jwt = require ("jsonwebtoken")
const bcrybt = require("bcryptjs")
const sendEmail = require("../../../Service/sendEmail");
const postModel = require("../../../DB/Model/Post");

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
        const {newEmail , userName} = req.body;
        const findUser = await userModel.findOne({email})
        if (findUser) {
                const user = await userModel.findOneAndUpdate({email} , {email : newEmail , userName:userName});
                const token = jwt.sign({id:user._id , email :user.email , role : user.role } , process.env.emailTokenSecreat , {expiresIn : 5*60})
                const URL = `${req.protocol}://${req.headers.host}/api/v1/user/confirmEmail/${token}`
                const message = `<a href= '${URL}'>Click here to confirm'</a>`
                await sendEmail(user.email , message)
                res.status(200).json({message:"updated" , user})
        } else {
        res.status(404).json({message:"email is not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Catch Error" , error})
        console.log(error);   
    }
}

const profilePic = async (req , res)=>{
try {
    if (req.fileErr) {
    res.status(400).json({message:"in-valid file type"})
    } else {
        const imageURL = `${req.finalDistenation}/${req.file.filename}`
        const user = await userModel.findByIdAndUpdate(req.user._id , {profilePic : imageURL} , {new : true})
        res.status(200).json({message:"Done" , user})
    }
} catch (error) {
    res.status(500).json({message:"Catch Error" , error})
    console.log(error); 
}
}

const coverPic = async (req , res)=>{
    try {
        if (req.fileErr) {
        res.status(400).json({message:"in-valid file rype"})
        } else {
            const URLS = []
            req.files.forEach(file => {
                URLS.push(`${req.finalDistenation}/${file.filename}`)
            });
            const user = await userModel.findByIdAndUpdate(req.user._id , {coverPic : URLS} , {new : true})
            res.status(200).json({message:"Done" , user})
        }
    } catch (error) {
        res.status(500).json({message:"Catch Error" , error})
        console.log(error); 
    }
    }

const updatePass = async (req , res)=>{
   try {
    const user = await userModel.findById(req.user._id)
    const {oldPassword , newPassword} = req.body;
    if (oldPassword == newPassword) {
        res.status(400).json({message : "newPass cannot equal oldPass"})
    } else {
        const match = await bcrybt.compare(oldPassword , user.password)
        if (!match) {
            res.status(400).json({message : "in-valid  oldPass"})
        } else {
            const hashPass = await bcrybt.hash(newPassword , parseInt(process.env.saltRound))
            await userModel.findByIdAndUpdate(user._id , {password : hashPass})
            res.status(200).json({message : "Done"})
        }
    }
   } catch (error) {
    res.status(500).json({message:"Catch Error" , error})
    console.log(error); 
   }
}

const allUsers = async (req ,res)=>{
    
    const cursor =  userModel.find({}).cursor();
    const post = []
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        const allPosts = await postModel.find({createdBy : doc._id})
        post.push({doc , allPosts})
      }
        res.status(200).json({ message: "Done" , post})


    // for await (const doc of userModel.find()){
    //     const posts = []
    //     const userPosts = await postModel.find({createdBy : doc._id})
    //     posts.push({user_info : doc , posts : userPosts})
    //     console.log(doc);
    //     res.status(200).json({message:"done" , posts})
    // }    
}

module.exports = {
    deActivate,
    blokAccount,
    updateProfile,
    profilePic,
    coverPic,
    updatePass,
    allUsers
}