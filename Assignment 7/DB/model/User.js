
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

    profilePic : String,

    coverPic : Array,

    age : Number,

    gender : {type : String, default : "male"},

    role : {type : String, default : "user"}, 

    confirmEmail : { type : Boolean, default : false},

    messagesArray : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'message'
    }]
},
{
    timestamps:true
})

userSchema.pre('save' , async function (next){
    this.password = await bcrypt.hash(this.password , parseInt(process.env.saltRound))
    next()
})
const updateHooks = ['findByIdAndUpdate' , 'findOneAndUpdate' , 'insertMany']
updateHooks.forEach(key => {
    userSchema.pre(key , async function(){
        const hookData = await this.model.findOne(this.getQuery())
        this.set({ __v : hookData.__v +  1 })
       })
});

const userModel = mongoose.model("user" , userSchema);

module.exports = userModel