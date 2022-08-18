const express =  require ('express');
const { drawTable } = require('./DB/connection');
const { userRouter, productRouter } = require('./modules/index.router');
const app = express();
const port = 3000;

app.use(express.json());

drawTable()
app.use(userRouter , productRouter)
app.listen(port , ()=>{
    console.log('running........');
})