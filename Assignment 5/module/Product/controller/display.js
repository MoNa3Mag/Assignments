
const moment = require("moment");
const productModel = require("../../../DB/model/product");





const allProductUser = async(req,res)=>{

    const productList = await productModel.find({}).populate([{
        path : "CreatedBy",
        select : "name email phone"
    }])
    res.json({message:"doneeee" , productList})

}

const allProductYesterday = async(req,res)=>{
    // const Yesterday = new RegExp (moment().add(-1 , 'days').format('YYYY-MM-DD'));
    const Yesterday = new RegExp (moment().subtract(1 , 'days').format('YYYY-MM-DD'));
    // console.log(Yesterday);
    const productYesterday = await productModel.find({createdAt:Yesterday}).populate('CreatedBy' , 'name').select("-__v")
    // console.log(productYesterday);
    res.json({message:"doneeee" , productYesterday})

}

// const getYesterday = async (req,res)=>{
// const Yesterday =moment().add(-1 , 'days').endOf('day').toDate();
// const today = moment().add(0 , 'days').startOf('day').toDate();

// const findAll = await productModel.find({'createdAt' : {"$gt" : Yesterday , "$lt" : today}}).populate("CreatedBy" , "name").select("-__v")
// res.json({message:"done" , findAll});
// };




module.exports = {
    allProductUser,
    allProductYesterday
};


