const userModel = require("../../../DB/model/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signup = async (req , res)=>{

    const {name , email , password , cpassword , phone , location} = req.body;
    
    if (password === cpassword) {
     const findUser = await userModel.findOne({email}).select("-password")
     console.log(findUser);
     if (findUser) {
         res.json({message:"email exist"})
     } else {
         const hashPassword = await bcrypt.hash(password , 8)
         const newUser = new userModel({name , email , password:hashPassword , phone , location});
         const saveUser = await newUser.save();
         res.json({message:"Done" , saveUser})
     }
    } else {
        res.json({message:"password misMaatch cPassword"})
    }

}

const signin = async(req,res)=>{

    const {email , password} = req.body;

    const user = await userModel.findOne({email});
    if (user) {
        const match = await bcrypt.compare(password , user.password)
        console.log(match);
        if (match) {
        const token = jwt.sign({id:user.id , isLoggedIn : true} , "test")    
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