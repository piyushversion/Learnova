const usermod = require("../models/usermodel");
const profilemod = require("../models/profilemodel");
const otpmod = require("../models/otpmodel");
const otpgen = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailsender = require("../utils/mailSender");
const passwordupdatedTemplate = require("../mailtemplates/passwordupdate");

require("dotenv").config();


// here this otp controller will execute when user comes to signup.

exports.sendotp = async(req,res)=>{

    try{

        const{email} = req.body;

        const userpresent = await usermod.findOne({email:email});

        if(userpresent){

            return res.status(400).json({

                success:false,
                message:"User already exist! please go to login"
            })

        }

        let otpval = otpgen.generate(6,{

            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false

        })

        const otpchk = await otpmod.findOne({otpvalue:otpval});

        while(otpchk){

            otpval = otpgen.generate(6,{

                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
    
            })

            otpchk = await otpmod.findOne({otpvalue:otpval});

        }

        const otpentry = await otpmod.create({email:email,otpvalue:otpval});

        if(!otpentry){

            return res.status(400).json({

                success:false,
                message:"Otp not generated"
            })

        } else{
            
            return res.status(200).json({
                
                success:true,
                message:"Otp generated and sent successfully",
                otp:otpval
            })
        }

    } catch(err){

        return res.status(500).json({

            success:false,
            message:`Cannot generate otp becoz error occured in controllers authcontrollers : ${err}`
        })

    }

}


exports.signup = async (req,res)=>{

    try {
        
        const{firstname,lastname,email,password,confirmpassword,accounttype,otp} = req.body

        if(!firstname || !email || !password || !confirmpassword || !accounttype || !otp){

            return res.status(403).json({

                success:false,
                message:"all feilds are not present"
            })
        }

        if(password !== confirmpassword){

            return res.status(403).json({

                success:false,
                message:"password do not match"
            })
        }

        const uerchk = await usermod.findOne({email:email});

        if(uerchk){

            return res.status(400).json({

                success:false,
                message:"user already exist"

            })

        }

        const recentotp = await otpmod.findOne({email:email}).sort({createdat:-1}).limit(1);

        console.log("Recent OTP : ",recentotp);

        if(!recentotp){

            return res.status(400).json({

                success:false,
                message:"Otp not found"

            })

        }

        if(recentotp.otpvalue !== otp){

            return res.status(400).json({

                success:false,
                message:"Otp not matched please enter correct otp"
            })

        }

        let hashedpassword = await bcrypt.hash(password,10);

        const profileentry = await profilemod.create({gender:null,dateofbirth:null,about:null,contactnumber:null});

        const userentry = await usermod.create({

            firstname:firstname,
            lastname:lastname,
            email:email,
            password:hashedpassword,
            accounttype:accounttype,
            additionaldetails:profileentry._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname}${lastname}&backgroundColor=714ada`

        })

        const payload = {

            email:userentry.email,
            id:userentry._id,
            accounttype:userentry.accounttype

        }

        let token = jwt.sign(payload,process.env.jwt_secret,{

            expiresIn:"2d"

        })

        return res.status(200).json({

            success:true,
            message:"User registered successfully",
            userentry:userentry,
            token:token

        })

    } catch (error) {
        
        return res.status(400).json({

            success:false,
            message:`User cannot be registered : ${error}`

        })

    }


}


exports.login = async(req,res)=>{

    try {
        
        const{email,password} = req.body;

        if(!email || !password){

            return res.status(400).json({

                success:false,
                message:"Please fill all the details carefullys"
            })
        }

        let finduser = await usermod.findOne({email:email}).populate("additionaldetails");

        if(!finduser){

            return res.status(400).json({

                success:false,
                message:"User is not registered! please register first"

            })

        }

        const payload = {

            email:finduser.email,
            id:finduser._id,
            accounttype:finduser.accounttype
        }


        if(await bcrypt.compare(password,finduser.password)){

            finduser.totallogins += 1;

            await finduser.save();

            let token = jwt.sign(payload,process.env.jwt_secret,{

                expiresIn:"2d"

            })

            finduser = finduser.toObject();

            finduser.token = token

            finduser.password = null;

            const options = {

                expires:new Date(Date.now()+ 3*24*60*60*1000)

            }

            res.cookie("cookie",token,options).status(200).json({

                success:true,
                token,
                finduser,
                message:"User loggedin successfully"

            })

        } else{

            return res.status(400).json({

                success:false,
                message:"Password Incorrect"
            })

        }

    } catch (error) {
        
        return res.status(400).json({

            success:false,
            message:`Login Failure : ${error}`
        })

    }

}


exports.changepassword = async(req,res)=>{

    try{

        const userdata = await usermod.findById(req.attachtoken.id);

        const {currentpassword,newpassword,confirmpassword} = req.body;

        const ispasswordmatched1 = await bcrypt.compare(currentpassword,userdata.password);

        if(!ispasswordmatched1){

            return res.status(400).json({
                
                success:false,
                message:"The old password is incorrect"
            })
        }

        if(newpassword !== confirmpassword){

            return res.status(400).json({
                
                success:false,
                message:"The new passwords do not match"
            })
        }

        const hashedpassword = await bcrypt.hash(newpassword,10);

        const updateusermod = await usermod.findByIdAndUpdate(req.attachtoken.id,{password:hashedpassword},{new:true});

        const sendmail = await mailsender(updateusermod.email,"Password Updated Successfully",passwordupdatedTemplate(updateusermod.email,updateusermod.firstname));

        return res.status(200).json({

            success: true,
            message: "Password updated successfully",

        })
        
    } catch(err){

        return res.status(400).json({

            success:false,
            message:`Error occured while updating password : ${err}`

        })

    }

}