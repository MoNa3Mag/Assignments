const sql = require("../../../DB/Connection");

const signup = (req,res)=>{
    const {name , email , password , age , cPassword} = req.body;

    if (password === cPassword) {
        
        sql.execute(`select email from user where email='${email}'` , (err , result)=>{
            if (err) {
                res.json({message:"Query Error" , err})
            } else {
                if (result.length) {
                    res.json({message:"email exist" , email})
                } else {
                    sql.execute(`insert into user (name , email , age , password) values('${name}','${email}','${age}',
                    '${password}')` , (err,result)=>{
                        if (err) {
                            res.json({message:"Query Error" , err})
                        } else {
                            res.json({message:"Done" , result})
                        }
                    })
                }
            }
        })

    } else {
        res.json({massage:"password and confirmPassword mismatch"})
    }
}

module.exports = {signup}