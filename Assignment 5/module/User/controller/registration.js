const userModel = require("../../../DB/model/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

const signup = async (req , res)=>{

    const {name , email , password , phone} = req.body;
    
     const findUser = await userModel.findOne({email}).select("-password")
     if (findUser) {
         res.json({message:"email exist"})
     } else {
         
        //  const hashPassword = await bcrypt.hash(password , parseInt(process.env.saltRound))
        //  const newUser = new userModel({name , email , password});
        //  const saveUser = await newUser.save();
        let saveUser = await userModel.insertMany({name , email ,password , phone});
         res.json({message:"Done" , saveUser})
        

     }
    

}

const signin = async(req,res)=>{

    const {email , password} = req.body;

    const user = await userModel.findOne({email});
    if (user) {
        const match = await bcrypt.compare(password , user.password)
        console.log(match);
        if (match) {
        const token = jwt.sign({id:user.id , isLoggedIn : true} , process.env.tokenSecret , {expiresIn : '1h'}) 
        res.json({message:"done" , token})
    
        } else {
        res.json({message:"in-valid password"})
        }
    } else {
        res.json({message:"email or password misMatch"})
    }
}

module.exports = {
    signup,
    signin
}