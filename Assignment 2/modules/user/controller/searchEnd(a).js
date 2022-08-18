const sql = require("../../../DB/Connection");

const searchEnd_a = (req,res)=>{
    const {name} = req.params;
    sql.execute(`select name , age , email from user where name like '%a'` , (err,result)=>{
        if (err) {
            res.json({message:"query error" , err})
        } else {
            if (result.length>0) {
                res.json({message:"Done" , result})
            } else {
               res.json({message:"not found"}) 
            }
        }
    })
}
module.exports = searchEnd_a