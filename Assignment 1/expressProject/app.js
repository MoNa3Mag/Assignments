const express = require('express');
const app = express();
const port =3000;
const {nanoid} = require ('nanoid');
let users = [
    { id: 1 , name: "mohamed" , age:23 , email:"mohamed@gmail.com"},
    { id: 2 , name: "mona" , age:40 , email:"mona@gmail.com"},
    { id: 3 , name: "Elwan" , age:30 , email:"Elwan@gmail.com"}
]

const auth = (req,res,next)=>{
    let validUser = true;
    if (validUser) {
        next()
        
    } else {
        res.json({massage:"In-valid login user"})
        
    }
}


app.use(auth,express.json())

app.get('/' , (req,res,next)=>{
    res.json({users})
})

app.post('/addUsers',(req,res)=>{
    const {email , name} = req.body
    console.log({email , name});
    const findUser = users.find((ele)=>{
        return ele.email == email
    })
    if (findUser) {
        res.json({massage:"email exist"})
        
    } else {
        req.body.id = nanoid()
        users.push(req.body)
        res.json({massage:"Done" , statusCode:201 , users})
        
    }
})

app.delete('/deleteUser',(req,res)=>{
    const {id} = req.body
    console.log({id});
    users = users.filter((ele)=>{
        return ele.id != id
    })
        res.json({massage:"Done"})
        

})

app.patch('/addUsers/:id' , (req,res)=>{
    const {id} = req.params;
    const {email} = req.body;
    users = users.map((ele)=>{
        if (ele.id == id) {
            ele.email = email;
            return ele
        } else {
            return ele
        }
    })


    res.json({massage:"done"})
})

app.get('/addUsers/:searchKey' , (req,res)=>{
    const searchKey = req.params.searchKey;
    const result = users.filter((ele)=>{
        return ele.name == searchKey || ele.age == searchKey || ele.email == searchKey
    })
    res.json({massage : " search list" , result})
})

app.get("/reverse", (req , res) =>{
    res.json({reversedArr:users.reverse()})
})

app.listen(port , ()=>{
    console.log("running.....");
})


// const express = require('express')
// const app =express();
// app.get('/' , (req,res,next) =>{
//     res.json({massage:"Welcom"})
// })

// app.listen(3000 , (req,res,next)=>{
//     console.log("running");
// })