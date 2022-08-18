require ('dotenv').config()
const express = require ("express");
const ConnectDB = require('./DB/Connection');
const app = express();
port = process.env.PORT;
const indexRouter = require ('./modules/index.router')
app.use(express.json())

app.use('/api/v1/user' , indexRouter.userRouter)
app.use('/api/v1/post' , indexRouter.postRouter)
app.use('/api/v1/comment' , indexRouter.commentRouter)

ConnectDB()

app.listen(port , ()=>{
    console.log(`server is running on port ${port} .......`);
})