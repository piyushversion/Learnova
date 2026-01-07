const cloudinary = require("cloudinary").v2

require("dotenv").config();

async function cloudinaryconnect(){

    try {
        
        await cloudinary.config({

            cloud_name:process.env.cloudinarycloudname,
            api_key:process.env.cloudinaryapikey,
            api_secret:process.env.cloudinaryapisecret

        })

        console.log("Cloudinary connection successfull")
        
    } catch (error) {
        
        console.log("Error in connecting cloudinary",error);

    }

}

module.exports = cloudinaryconnect