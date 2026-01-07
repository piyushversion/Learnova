const passwordresettemplate = require("../mailtemplates/passwordresetlink");
const usermod = require("../models/usermodel");
const mailsender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetpassword = async(req,res)=>{

    try {
        
        const{email} = req.body;

        const chkuser = await usermod.findOne({email:email});

        if(!chkuser){

            return res.status(400).json({

                success:false,
                message:"your email is not registered with us"

            })

        }

        const code = Math.floor(1000+Math.random(3)*3000);

        const insertatdb = await usermod.findOneAndUpdate({email:email},{uniquecode:code,expirationtimeofuniquecode:Date.now() + 5*60*1000},{new:true});

        const linktoresetpassword = `http://localhost:5173/update-password/${code}`;

        await mailsender(email,"Password Reset Request",passwordresettemplate(linktoresetpassword));

        return res.status(200).json({

            success:true,
            message:"email sent successfully check your email"
        })

    } catch (error) {
        
        return res.status(400).json({

            success:false,
            message:`error in reseting password in controller in resetpassword : ${error}`
        })

    }

}


exports.actualresetpassword = async(req,res)=>{

    try {
        
        const{password,confirmpassword,code} = req.body;

        if(password!==confirmpassword){

            return res.status(400).json({

                success:false,
                message:"Password not matching"
            })
        }

        const userdet = await usermod.findOne({uniquecode:code});

        if(!userdet){

            return res.status(400).json({

                success:false,
                message:"code invalid or expired"
            })

        }

        if(userdet.expirationtimeofuniquecode < Date.now()){

            return res.status(400).json({

                success:false,
                message:"code expired"
            })

        }

        const hashedpassword = await bcrypt.hash(password,10);

        const updatedb = await usermod.findOneAndUpdate({uniquecode:code},{password:hashedpassword},{new:true});

        return res.status(200).json({

            success:true,
            message:"password reset successfully"
        })

    } catch (error) {
        
        return res.status(400).json({

            success:false,
            message:`Error in reseting password in controllers in actualresetpassword : ${error}`
        })

    }

}