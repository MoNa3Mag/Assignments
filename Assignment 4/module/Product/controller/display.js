const req = require("express/lib/request");
const productModel = require("../../../DB/model/product");

const displayProduct = async(req,res) =>{

    const display = await productModel.find({}).populate("CreatedBy")
    
    // const display = await productModel.aggregate([{
    //     $lookup : {
    //         from : 'userModel',
    //         localField : 'CreatedBy',
    //         foreignField : '_id' ,
    //         as :  'userModel' 
    //     }
    // }])
    
    res.json({message:"Done" , display})
}


const productUser = async(req,res)=>{

    const id = req.user.id;
    const ownerProduct = await productModel.find({CreatedBy:id})
    res.json({message:"doneeee" , ownerProduct})

}




module.exports = {displayProduct , productUser};


