const sendEmail = require("../../../Service/sendEmail");

const sendEmailtoMultipleUser = (req , res)=>{
    try {
        const emails = "mona@gmail.com , mon408260@gmail.com , magdy256@gmail.com";
        const messages = '<p>Welcome to the staff</p>'
        sendEmail(emails , messages)
        res.status(200).json({message:"Done"})
    } catch (error) {
        res.status(500).json({message:"Catch Error" , error})
        console.log(error);
    }
}
module.exports = {
    sendEmailtoMultipleUser
}