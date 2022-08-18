const sql = require("../../../DB/Connection");

const deleteUser = (req,res)=>{
    const {id} = req.params;
    sql.execute(`delete from user where id = ${id}` , (err,result)=>{
        if (err) {
            res.json({message:"query error" , err})
        } else {
            if (result.affectedRows >0) {
                res.json({message:"deleted success" , result})
            } else {
             res.json({message:"in-valid user id"})
            }
        }
    })
}

module.exports = {deleteUser}