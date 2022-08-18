
const mongoose = require ('mongoose');

const connectDB = ()=>{
    return mongoose.connect("mongodb+srv://mona:26960103@cluster0.dprxj.mongodb.net/fridayDB").then((result)=>{
        console.log("connected.....");
    }).catch(err =>{console.log("fail to connect DB....." , err);})
}

module.exports = connectDB