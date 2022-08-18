
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    phone: String,

    age : Number,

    gender : {type : String, default : "male"},

    role : {type : String, default : "user"}, 

    confirmEmail : { type : Boolean, default : false}
},
{
    timestamps:true
})

userSchema.pre('save' , async function (next){
    this.password = await bcrypt.hash(this.password , parseInt(process.env.saltRound))
    next()
})

const userModel = mongoose.model("user" , userSchema);

module.exports = userModel
    