const postModel = require("../../../DB/Model/Post");
const commentModel = require("../../../DB/Model/Comment");
const { populate } = require("../../../DB/Model/Comment");
const select = 'userName email'
const getPosts = [
    [
        {
            path : 'createdBy',
            select
        },
        {
            path : 'liles',
            select
        },
        {
            path : 'comments',
            match : {isDeleted : false},
            populate : ([
                {
                    path : 'createdBy',
                    select 
                },
                {
                    path : 'replys',
                    populate : ([
                        {
                            path : 'createdBy',
                            select 
                        },{
                            path : 'replys',
                            populate : ([
                                {
                                    path : 'createdBy',
                                    select 
                                }
                            ])
                        }

                    ])
                }
            ])
        }
    ]
]

const createPost = async (req, res) => {
    const { text } = req.body
    if (req.fileErr) {
        res.json({ message: "in-valid file format" })
    } else {
        const imageURLs = []
        req.files.forEach(file => {
            imageURLs.push(`${req.finialDestination}/${file.filename}`)
        });
        const newPost = new postModel({ text, image: imageURLs, createdBy: req.user._id })
        const savedPost = await newPost.save();
        res.status(201).json({ message: "Done", savedPost })
    }
}

const like_unlikePost = async (req, res) => {
    const { _id } = req.user
    const {id} = req.params
    const post = await postModel.findOne({_id : id})
    if (!post) {
        res.status(404).json({ message: "in-valid post id" })
    } else {
        if (post.createdBy.toString() == _id.toString()) {
            res.status(404).json({ message: "sorry, cannot like this post" }) 
            
        } else {
            if (post.liles.includes(_id)) {
                await postModel.findOneAndUpdate({_id : id} , { $pull : {liles : _id}})
                res.status(200).json({ message: "unLike done" })
            } else {
                await postModel.findOneAndUpdate({_id : id} , { $push : {liles : _id}})
                res.status(200).json({ message: "Like done" })  
            }
        }
    }
}

const allPosts = async (req, res) => {
    const post =await  postModel.find({}).populate(getPosts)

        res.status(200).json({ message: "Done" , post})
}


module.exports = {
    createPost,
    like_unlikePost,
    allPosts
}


