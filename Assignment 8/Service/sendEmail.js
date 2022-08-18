const nodeoutlook = require('nodejs-nodemailer-outlook')

function sendEmail(dest , message){
  nodeoutlook.sendEmail({
    auth: {
        user: process.env.senderEmail,
        pass: process.env.senderPassword
    },
    from: process.env.senderEmail,
    to: dest,
    subject: 'Hey you, awesome!',
    html: message,
    text: 'This is text version!',
    replyTo: 'receiverXXX@gmail.com',
    attachments: [
                      {
                        path: `Capture.PNG`
                      } 
                    ],
    onError: (e) => console.log({nodeoutlookError : e}),
    onSuccess: (i) => console.log({nodeoutlookError : i})
}


);
}



module.exports = sendEmail