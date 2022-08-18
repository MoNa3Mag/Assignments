const sql = require("../../../DB/Connection");

const searchNA = (req,res)=>{
    const {age , name} = req.params;
    sql.execute(`select name , age , email from user where name like 'A%' and age <= 30` , (err,result)=>{
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

module.exports = searchNA