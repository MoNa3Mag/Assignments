const mongoose = require("mongoose")



const messageSchems = new mongoose.Schema({
    messageBody : {
        type : String,
        required  :true
    },
    reciverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    }
},
{
    timestamps : true
})

const messageModel = mongoose.model("message" , messageSchems);

module.exports = messageModel


