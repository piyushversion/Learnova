const mongoose = require("mongoose");
const mailsender = require("../utils/mailSender");
const otpTemplate = require("../mailtemplates/emailverification");

const otpSchema = new mongoose.Schema({

    otpvalue:{

        type:String

    },
    email:{

        type:String

    },
    createdat:{

        type:Date,
        default:Date.now,
        expires:5*60

    }

})

const sendVerificationmail = async (email,otp)=>{

    try{

        console.log(email,otp);

        let res = await mailsender(email,"Verification email from Learnova",otpTemplate(otp));

        if(!res.success){

            throw new Error("Mail not sent");

        } else{

            console.log("Mail sent successfully");
            return {success:true,message:"Mail sent successfully!"};

        }

    } catch(err){

        console.log("Error occured in sending mail in models otpmodel.js",err);
        return {success:false,message:"Error in sending mail!"};

    }

}

otpSchema.pre("save",async function(next){

    console.log(this.email)

    let resp = await sendVerificationmail(this.email,this.otpvalue);

    if(!resp.success){ 

        throw new Error(resp.message);

    } else{

        console.log("Mail sent successfully from pre save hook");
        next();
    }


})

module.exports = mongoose.model("otpmodel",otpSchema);