const jwt = require("jsonwebtoken");
const userModel = require ("../DB/model/User")

const  {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require ('http-status-codes');

const roles = { 
    User : "user",
    Admin : "admin"
}

const auth = (accessRoles)=>{
   return async(req,res,next)=>{
   
    try {
        
        const headerToken = req.headers['authorization'];

        if (!headerToken || headerToken == null || headerToken == undefined || !headerToken.startsWith('Bearer ')) {
            
            res.json({message:"in-valid header token"})
            
    
        } else {
            const token = headerToken.split(" ")[1];
            const decoded = jwt.verify( token , process.env.tokenSignature)
            if (decoded.isLoggedIn) {
                
                const findUser = await userModel.findById(decoded.id).select("email name role")
                if (findUser) {

                    if (accessRoles.includes(findUser.role)) {
                        req.user = findUser
                        next()
                    } else {
                    res.status(StatusCodes.UNAUTHORIZED).json({message:"not auth " , status : UNAUTHORIZED})
                    }


                } else {
                    res.json({message:"in-valid token user"})
                }

            } else {
                 res.json({message:"in-valid token paylood"})
            }
            
        }
    
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"catch error" , error})
    }

    }
}

module.exports = {
    auth,
    roles
}