const userModel = require("../../../DB/model/User");
const messageModel = require("../../../DB/model/Messages")

const sendMessage = async (req,res)=>{


    const {messageBody} = req.body;
    const {id} = req.params;

    const findUser = await userModel.findById(id).select("name email")

    if (findUser) {
        
        const messages = await messageModel.insertMany({messageBody, reciverId: findUser._id})
        res.status().json({message:"Done" , messages})


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
    const deleteMess = await messageModel.deleteOne({_id:id , reciverId:req.user._id})
    res.json({message:"Done" , deleteMess})

} 

module.exports = {
    sendMessage,
    getMessages,
    deletedMessage
}