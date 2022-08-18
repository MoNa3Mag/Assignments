const userModel = require("../../../DB/model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const signin =  async(req,res)=>{

    const {email , password} = req.body;

    const user = await userModel.findOne({email})
    if (user) {
        const match = await bcrypt.compare(password , user.password)
        if (match) {
            const token = jwt.sign({id: user._id , isLoggedIn : true} , process.env.tokenSignature , {expiresIn: 3600})
            res.json({message:"Done" , token})
        } else {
            res.json({message:"in-valid password"})
        }

    } else { 
        res.json({message:"email or password misMatch"})
    }
}

module.exports = signin
    