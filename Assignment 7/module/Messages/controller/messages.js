const userModel = require("../../../DB/model/User");
const messageModel = require("../../../DB/model/Messages")

const sendMessage = async (req,res)=>{


    const {messageBody} = req.body;
    const {id} = req.params;

    const findUser = await userModel.findById(id).select("name email")

    if (findUser) {
        
        const messages = await messageModel.insertMany({messageBody, reciverId: findUser._id})
        const userM = await userModel.findOneAndUpdate({_id : req.params.id} , {$push : {messagesArray : messages[0]._id}} , {new : true})
        console.log(messages);
        res.json({message:"Done" , userM})


    } else {
        res.json({message:"user not exist"})
    }
}



const getMessages =  async (req,res)=>{

    const getMessagesList = await (await messageModel.find({reciverId:req.user._id})).populate([
        {
            path:"reciverId"
        }
    ])

    res.json({message:"Done" , getMessagesList })

}

const deletedMessage = async (req,res)=>{

    const {id} = req.params;
    console.log(id);
    const userDE = await userModel.findOneAndUpdate({_id : req.user.id} , {$pull : {messagesArray : id}} , {new: true })
    const deleteMess = await messageModel.deleteOne({_id:id , reciverId:req.user._id})

    res.json({message:"Done" , userDE})

} 

module.exports = {
    sendMessage,
    getMessages,
    deletedMessage
}