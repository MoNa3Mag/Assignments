const userModel = require("../../../DB/model/User")

const signup = async(req,res)=>{

try {
    const {name , email , password} = req.body;
    const newUser = new userModel({name , email , password});
    const saveUser = await newUser.save();
    res.json({message:"Done" , saveUser})

} catch (error) {
    if (error.keyValue) {
        if (error.keyValue.email) {
            res.json({ message: "email exist"})
        }
        
    } else {
        res.json({ message: "catch error ", error })
        console.log(error);
        
    }
}
}

module.exports = signup