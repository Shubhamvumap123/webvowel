const nodemailer = require('nodemailer')
 const sendEmail = async(email, subject,text)=>{
     console.log(process.env.HOST,process.env.USER)
    try {const transporter = nodemailer.createTransport({
        host:process.env.HOST,
        service:process.env.SERVICE,
        port: 587,
        secure: true,
        auth:{
            user:"shubhamvumap123@gmail.com",
            pass:'ljakyasdpldxxmcb',
        },
    });
    await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text,
      });
      console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
 }
 module.exports = sendEmail;