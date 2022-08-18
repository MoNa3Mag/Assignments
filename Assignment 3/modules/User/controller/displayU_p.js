const productModel = require("../../../DB/model/Product");
const userModel = require("../../../DB/model/User")

const Users = async (req,res)=>{
    const disUser = await userModel.findAll({attributes:['firstName' , 'lastName' , 'email' , 'age']
           , include:[{
            model:productModel
        }]
    })

    res.json({message:"Done" ,disUser })
}

module.exports = Users;