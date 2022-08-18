const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");
const CryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    phone:String,
    emailConfirm : {
        type : Boolean,
        default : false
    }
},
{
timestamps:true
})


// userSchema.pre('save' , async function(next){
//     console.log(this);
//     this.password = await bcrypt.hash(this.password , parseInt(process.env.saltRound));
//     console.log(this);
// })

userSchema.pre('insertMany' , async function(next , docs){
    
    docs.password = await bcrypt.hash(docs.password , parseInt(process.env.saltRound));
    docs.phone = CryptoJS.AES.encrypt(`${docs.phone}`, process.env.encrptionSecretKey).toString();
    console.log(docs.phone);
})
userSchema.pre('findById' , async function(next , docs){
    
    docs.phone = CryptoJS.AES.decrypt(`${docs.phone}`, process.env.encrptionSecretKey).toString(CryptoJS.enc.Utf8);
    console.log(docs.phone);
})


const userModel = mongoose.model('user' , userSchema);

module.exports = userModel;