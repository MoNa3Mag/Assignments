const mongoose = require("mongoose");
const bcrybt = require('bcryptjs')


const userSchema = new mongoose.Schema(
{ 
    userName : {type : String , required : true},
    firstName: String,
    lastName : String,
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    age : {type : Number , required : true},
    phone : String,
    gender : {type : String , required : true , enum : ['Male' , 'Female'] , default : 'male'},
    confirmEmail : {type : Boolean ,default : false},
    isBlooked : {type : Boolean ,default : false},
    profilePic : String,
    coverPic : Array ,
    gallary : Array,
    onLine : {type : Boolean , default : false},
    follower : [{type : mongoose.Schema.Types.ObjectId , ref : 'User'}] ,
    role : {type : String , default : 'User'},
    socialLink : Array,
    pdfLike : String,
    story : Array,
    lastSeen: Date,
    deActivated : {type : Boolean , default : false}
},
{
    timestamps : true
}
)

userSchema.pre('save' , async function (next){
    this.password = await bcrybt.hash(this.password , parseInt(process.env.saltRound))
    next()
})

const userModel = mongoose.model ('User' , userSchema)

module.exports = userModel