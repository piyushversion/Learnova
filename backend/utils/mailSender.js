const nodemailer = require("nodemailer");

const mailsender = async (email,title,body,from)=>{

    try{

        let transporter = nodemailer.createTransport({

            host:"smtp.gmail.com",
            auth:{

                user:"piyushdhote190@gmail.com",
                pass:"vjsbyedailpnflbp"

            }
        })

        let info = await transporter.sendMail({

            from: `${from ? from : "Piyush Dhote"}`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`

        })

        if(info.accepted.length > 0){

            return {success:true,message:"Mail sent successfully!"};

        } else{

            return {success:false,message:"Mail not sent!"};

        }

    } catch(err){

        console.log("Error in sending mail in utils mailSender.js",err);
        
        return {success:false,message:"Error in sending mail!"};
    }

}

module.exports = mailsender