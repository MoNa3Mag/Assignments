const sql = require("../../../DB/Connection");

const searchAge = (req,res)=>{
    const {age , name} = req.params;
    sql.execute(`select name , age , email from user where name like'%${name}%' and age between 20 and 40` , (err,result)=>{
        if (err) {
            res.json({message:"query error" , err})
        } else {
            if (result.length) {
                res.json({message:"Done" , result})
            } else {
                res.json({message:"not found"})
            }
        }
    })
}
module.exports = searchAge