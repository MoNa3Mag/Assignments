const sql = require("../../../DB/Connection")

const allUsers = (req,res)=>{
    sql.execute(`select * from user` , (err,result)=>{
        if (err) {
            res.json({message:"query error" , err})
        } else {
            res.json({message:"Done" , result})
        }
    })
}
module.exports = allUsers