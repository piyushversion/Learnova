const coursemod = require("../models/coursemodel");
const usermod = require("../models/usermodel");
const ratingandreviewsmod = require("../models/ratingandreviewsmodel");
const { default: mongoose } = require("mongoose");

exports.createrating = async(req,res)=>{

    try {
        
        const userid = req.attachtoken.id;

        const{courseid,rating,review} = req.body;

        const chkenrollment = await coursemod.findById(courseid);

        if(!chkenrollment){

            return res.status(404).json({

                success:false,
                message:"course not found"
            })

        }

        const convertuserid = new mongoose.Types.ObjectId(userid);

        if(chkenrollment.studentenrolled.includes(convertuserid)){

            const checkifuserhasalreadygivenrating = await ratingandreviewsmod.findOne({userwhohasgivenrar:userid,courseonwhichrargiven:courseid})

            if(checkifuserhasalreadygivenrating){

                return res.status(404).json({

                    success:false,
                    message:"course is already rated by the user"

                })

            }

            const createratingandreviews = await ratingandreviewsmod.create({userwhohasgivenrar:userid,rating:rating,reviews:review,courseonwhichrargiven:courseid,createdat:Date.now()})

            const insertintocoursemod = await coursemod.findByIdAndUpdate(courseid,{$push:{ratingandreviews:createratingandreviews._id}},{new:true}).populate("ratingandreviews");

            return res.status(200).json({

                success:true,
                message:"rating and review created successfully",
                data:insertintocoursemod
            })

        } else{

            return res.status(404).json({

                success:false,
                message:"student is not enrolled in this course"

            })

        }

    } catch (error) {
        
        return res.status(404).json({

            success:false,
            message:`Error occured while creating rating in ratingandreviews controller`

        })

    }

}


exports.getaverageratingofparticularcourse = async(req,res)=>{

    try {
        
        const{courseid} = req.body

        const course = await coursemod.findById(courseid).populate("ratingandreviews");

        if(!course){

            return res.status(400).json({

                success:false,
                message:"Could not find the course"
            })

        }

        if(course.ratingandreviews.length === 0){

            return res.status(200).json({

                success:true,
                message:"successfully got average rating",
                averagerating: course.ratingandreviews.length
            })

        }

        if(course.ratingandreviews.length > 0){

            const totalrating = course.ratingandreviews.reduce((sum,rat)=>sum+rat.rating,0);

            return res.status(200).json({

                success:true,
                message:"successfully got average rating",
                averagerating: totalrating / course.ratingandreviews.length
            })

        }



    } catch (error) {
        
        return res.status(404).json({

            success:false,
            message:`Error in getting average rating in ratingandreviewscontroller : ${error}`
        })

    }

}


exports.getallratingandreviews = async(req,res)=>{

    try {
        
        const allratingandreviews = await ratingandreviewsmod.find({}).sort({rating:"desc"}).populate("userwhohasgivenrar","firstname lastname image").populate("courseonwhichrargiven","coursename coursedescription").exec();

        return res.status(200).json({

            success:true,
            message:"all rating and reviews fetched succesfully",
            data:allratingandreviews
        })

    } catch (error) {
        
        return res.status(404).json({

            success:false,
            message:`Error in getting rating and reviews in ratingandreviewscontroller : ${error}`
        })

    }

}