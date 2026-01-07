const mailsender = require("../utils/mailSender");

exports.contactus = async(req,res)=>{

    try{
        
        const {firstname,lastname,email,phone,message} = req.body;

        let r = await mailsender("piyushdhote190@gmail.com", "New Form Submission",
            
            `<h1>First Name : ${firstname}</h1>`
            + `<h1>Last Name : ${lastname ? lastname : null}</h1>`
            + `<h1>Email : ${email}</h1>`
            + `<h1>Phone : ${phone ? phone : null}</h1>`
            + `<h1>Message : ${message}</h1>`,`${firstname} ${lastname}`);

        if(!r.success){

            return res.status(400).json({
                success:false,
                message:"Error in sending mail"
            });

        } else{

            return res.status(200).json({
                success:true,
                message:"Mail sent successfully"
            });

        }

    } catch(err){

        console.log("Error in contactus controller",err);
        return res.status(500).json({
            success:false,
            message:`Error in contactus controller: ${err}`
        });

    }

}