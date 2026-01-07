const jwt = require("jsonwebtoken");

require("dotenv").config();


exports.authenticationmiddleware = async(req,res,next)=>{

    try {
        
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        if(!token){

            return res.status(400).json({

                success:false,
                message:"Token not found"
            })

        }

        try {
            
            const decodetoken = jwt.verify(token,process.env.jwt_secret);

            req.attachtoken = decodetoken

        } catch (error) {
            
            return res.status(400).json({

                success:false,
                message:"Token is invalid"
            })

        }

        next();

    } catch (error) {
        
        return res.status(400).json({

            success:false,
            message:`something went wrong while validating the token in middlewares in authmiddleware : ${error}`
        })

    }

}

exports.isstudentmiddleware = async(req,res,next)=>{

    try {
        
        if(req.attachtoken.accounttype !== "Student"){

            return res.status(400).json({

                success:false,
                message:"This is protected route for student"

            })

        }

        next();

    } catch (error) {
        
        return res.status(500).json({

            success:false,
            message:`user role is not matching : ${error}`
        })

    }

}


exports.isteachermiddleware = async(req,res,next)=>{

    try {
        
        if(req.attachtoken.accounttype !== "Instructor"){

            return res.status(400).json({

                success:false,
                message:"This is protected route for teacher"

            })

        }

        next();

    } catch (error) {
        
        return res.status(500).json({

            success:false,
            message:`user role is not matching : ${error}`
        })

    }

}


exports.isadminmiddleware = async(req,res,next)=>{

    try {
        
        if(req.attachtoken.accounttype !== "admin"){

            return res.status(400).json({

                success:false,
                message:"This is protected route for admin"

            })

        }

        next();

    } catch (error) {
        
        return res.status(500).json({

            success:false,
            message:`user role is not matching : ${error}`
        })

    }

}