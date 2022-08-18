const commentModel = require("../../../DB/Model/Comment");
const postModel = require("../../../DB/Model/Post");

const createComment = async (req , res)=>{
    const {id} = req.params;
    const {text} = req.body;
    const post = await postModel.findById(id)
    if (!post) {
        res.status(404).json({message:"not found post"})
    } else {
        const newComment = new commentModel({text : text , createdBy : req.user._id , postId : post._id})
        const savedComment = await newComment.save();
        const savedPost = await postModel.findByIdAndUpdate(post._id , {$push : {comments : savedComment._id}} , {new : true})
        res.status(201).json({message:"create comment" , savedPost})
    }
}

const likeComment = async (req, res) => {
    const { id } = req.params
    const {_id} = req.user
    const comment = await commentModel.findById(id)
    if (!comment) {
        res.status(404).json({ message: "in-valid comment id" })
    } else {
        if (comment.createdBy.toString() == _id.toString()) {
            res.status(404).json({ message: "sorry, cannot like this post" }) 
        } else {
            await commentModel.findByIdAndUpdate(comment._id, { $push: { likes: _id } })
            res.status(200).json({ message: "Done" })
        }
    }
}

const rplayComment = async (req , res)=>{
    const {id , commentID} = req.params;
    const {text} = req.body;
    const post = await postModel.findById(id)
    if (!post) {
        res.status(404).json({message:"not found post"})
    } else {
        const comment = await commentModel.findOne({postID : post._id , _id : commentID})
        if (!comment) {
            res.status(404).json({message:"in-valid comment id"})
        } else {
            const newComment = new commentModel({text : text , createdBy : req.user._id , postId : post._id})
            const savedComment = await newComment.save();
            await commentModel.findOneAndUpdate(comment._id , {$push : {replys : savedComment._id}} , {new : true })
        }
        res.status(201).json({message:"create comment"})
    }
}

module.exports = {
    createComment,
    likeComment,
    rplayComment
}