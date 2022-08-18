const express = require ('express');
const { userRouter } = require('./router/allRouter');
const { blogRouter } = require('./router/allRouter');
const app = express();
const port = 3000;
app.use(express.json())



app.use(userRouter , blogRouter)
app.listen(port , (req,res)=>{
    console.log("running.....");
})