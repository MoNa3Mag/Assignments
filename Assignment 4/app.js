const express = require ('express');
const connectDB = require('./DB/connection');
const { userRouter, productRouter } = require('./module/index.router');
const app = express();
const port = 3000;
app.use(express.json())
app.use(userRouter,productRouter)
connectDB()
app.listen(port , ()=>{
    console.log("running..........");
})