const express = require ('express');
const connectDB = require('./DB/connection');
const { userRouter, productRouter } = require('./module/index.router');
const app = express();
require('dotenv').config()
const port = process.env.PORT;
app.use(express.json())
app.use(userRouter,productRouter)
connectDB()
app.listen(port , ()=>{
    console.log(`running..........on port ${port}`);
})