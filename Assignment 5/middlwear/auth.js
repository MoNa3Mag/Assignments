const userModel = require("../DB/model/user");
const jwt = require('jsonwebtoken');


const auth = ()=>{
    return async(req,res,next)=>{


        const headerToken = req.headers['authorization'];
        console.log(headerToken);

        if (headerToken==null || headerToken==undefined || !headerToken.startsWith(`${process.env.BearerSecret} `)) {
            res.json({message:"in-valid header Token"})
        } else {
            const token =  headerToken.split(" ")[1];
            console.log(token);
            const decoded = jwt.verify(token , 'test');
            console.log(decoded);
            const user = await userModel.findById(decoded.id).select("-password")
            if (!user) {
                res.json({message:"in-valid user token"})
            } else {
                req.user = user,
                next();
            }
        }
    }
}

module.exports = auth;