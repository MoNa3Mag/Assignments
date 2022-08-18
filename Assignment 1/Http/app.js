
const http = require('http');
const port = (3000)
const {nanoid} = require("nanoid");
let users = [
    {id:1 , name:"mona" , age:26 , email:"mona@gmail.com"},
    {id:2 , name:"ahmed" , age:30 , email:"ahmed@gmail.com"},
    {id:3 , name:"mohamed" , age:37 , email:"mohamed@gmail.com"}
]
http.createServer((req,res) =>{
    const {url, method} = req;
    if(url == '/' && method =='GET')
    {
        res.write(JSON.stringify(users))
        res.end()
    }
    else if(url == '/addUsers' && method=='POST'){
        let bufferBodyData;
        req.on('data' , (chunk)=>{
            bufferBodyData = chunk;
        })
        req.on('end' , ()=>{
            let convertBufferDataToObject = JSON.parse(bufferBodyData)
            const findUser = users.find((ele) =>{
                return ele.email == convertBufferDataToObject.email
            })
            if(findUser){
                res.write("user already exist")
                res.end()
            }
            else{
                // addUsers
                convertBufferDataToObject.id = nanoid();
                users.push(convertBufferDataToObject)
                res.write(JSON.stringify(users))
                res.end()
            }
        })
    }
    else if(url == '/deleteUser' && method == 'DELETE'){
        let bufferBody;
        req.on('data' , (chunk) =>{
            bufferBody = chunk;
        })
        req.on('end' , ()=>{
            const convertBuffer = JSON.parse(bufferBody);
            users = users.filter((ele)=>{
                return ele.id != convertBuffer.id
            })
            res.write(JSON.stringify(users))
            res.end();
        })
    }

    else if( url == '/addUsers' && method == 'PATCH'){
        let bufferBody;
        req.on('data' , (chunk)=>{
            bufferBody = chunk;
        })
        req.on('end' , ()=>{
            const convertBuffer = JSON.parse(bufferBody);
            users = users.map((ele)=>{
                if (ele.id == convertBuffer.id) {
                    ele.email = convertBuffer.email
                    return ele
                } else {
                    return ele
                }
            })
            res.write("done")
            res.end()
        })

    }

    else if (url == '/addUsers' && method == 'GET'){
        
        let bufferBody;
        req.on('data' , (chunk)=>{
            bufferBody = chunk;
        })
        req.on('end' , ()=>{
            const convertBuffer = JSON.parse(bufferBody);
            const result = users.filter((ele)=>{
              return ele.name == convertBuffer.name || ele.age == convertBuffer.age || ele.email == convertBuffer.email
            })
            res.write(JSON.stringify(result))
            res.end()
        })
    }

    else if (url == '/reverse' && method =='GET'){
        
        res.write(JSON.stringify({reversedArr:users.reverse()}))
        res.end()

    }



    else
    {
        res.write("404 Not Found")
        res.end()
    }
    
})
.listen(port,()=>{console.log("Running..........");})