const sql = require("../../../DB/Connection")


const searchUser = (req,res)=>{
    const name = req.params.name
    sql.execute(`select name , age ,email from user where name like'%${name}%'` , (err,result)=>{
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
module.exports = searchUser