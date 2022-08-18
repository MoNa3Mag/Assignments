const sql = require("../../../DB/Connection");

const updatUser = (req,res)=>{
    const {id} = req.params; 
    const {name , age} = req.body;
    sql.execute(`update user set name = '${name}', age = ${age} where id =${id}` , (err,result) =>{
        if (err) {
            res.json({message:"Query Error" , err})
        } else {
            if (result.affectedRows > 0) {
                res.json({message:"user updated success" ,result})
            } else {
                res.json({message:"in-valid id"})
            }
        }
    })
}

module.exports = updatUser