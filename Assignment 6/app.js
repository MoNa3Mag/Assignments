const express = require ("express");
require("dotenv").config();
const connectDB = require("./DB/connection");
const moduleRouters = require("./module/index.router");
const app = express();
const port = process.env.PORT;
app.use(express.json())






app.use(moduleRouters.userRouter ,
    moduleRouters.messageRouter ,
    moduleRouters.authRouter)

connectDB()

app.listen(port , ()=>{
    console.log(`server is running on port number..........${port}`);
})