const mongoose = require("mongoose");



const connectDB = ()=>{
    return mongoose.connect(process.env.DBURL).then((result)=>{
        console.log(`connected DB...........${process.env.DBURL}`);
    }).catch(err=>(console.log("fail to connected" , err)))
}


module.exports = connectDB