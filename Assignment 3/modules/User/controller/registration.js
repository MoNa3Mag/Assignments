const userModel = require("../../../DB/model/User");

const signup = async(req,res)=>{
const {firstName , lastName , email , Password , cpassword , age} = req.body;
if (Password === cpassword) {
    
const findUser =await userModel.findAll({
    attributes :['email'],
    where:{email}
})

if (findUser.length) {
    res.json({message:"email Exist" , findUser})
} else {
    const createUser = await userModel.create({firstName , lastName , email , Password , age});
    res.json({message:"Done" , createUser})
}


} else {
    res.json({message:"password an confirmation password misMatch"})
}
}


const signin = async(req,res)=>{

    const {email , Password} = req.body;
    const findUser = await userModel.findAll({
        attributes:['id','firstName','lastName','email'],
        where:{email,Password}
    })

    if (findUser.length) {
        res.json({message:"Done" , findUser})
    } else {
        res.json({message:"email or password are in-valid"})
    }
}

module.exports = {
    signup,
    signin
}