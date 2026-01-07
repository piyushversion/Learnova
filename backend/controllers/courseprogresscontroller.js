const mongoose = require("mongoose");
const sectionmod = require("../models/sectionmodel");
const subsectionmod = require("../models/subsectionmodel");
const coursemod = require("../models/coursemodel");
const courseprogressmod = require("../models/courseprogressmodel");

exports.updatecourseprogress = async(req,res)=>{

    const{courseid,subsectionid} = req.body;

    const userid = req.attachtoken.id;

    try{

        const course = await coursemod.findById(courseid);

        if(!course){

            return res.status(400).json({

                success:false,
                message:"Course not exist"

            })

        }

        const subsection = await subsectionmod.findById(subsectionid);

        if(!subsection){

            return res.status(400).json({

                success:false,
                message:"Subsection not exist"

            })

        }

        let courseprogress = await courseprogressmod.findOne({courseid:courseid,userid:userid})

        if(!courseprogress){

            return res.status(400).json({

                success:false,
                message:"Course progress not exist"

            })

        }

        if(courseprogress.completedvideos.includes(subsectionid)){

            return res.status(400).json({

                success:false,
                message:"Lecture already completed"

            })

        }

        courseprogress.completedvideos.push(subsectionid);

        await courseprogress.save();

        return res.status(200).json({

            success:true,
            message:"Lecture completed successfully"

        })

    } catch(err){

        return res.status(500).json({

            success:false,
            message:`Error in updating course progress : ${err}`

        })

    }

}

exports.completefullcourse = async(req,res)=>{

    const {courseid} = req.body;

    const userid = req.attachtoken.id;

    try{

        const coursedetails = await coursemod.findById(courseid).populate({path:"coursecontent",populate:{path:"subsection"}}).exec();

        if(!coursedetails){

            return res.status(400).json({

                success:false,
                message:"Course not exist"

            })

        }

        let courseprogress = await courseprogressmod.findOne({courseid:courseid,userid:userid})

        if(!courseprogress){

            return res.status(400).json({

                success:false,
                message:"Course progress not exist"

            })

        }

        let lecturearray = [];

        coursedetails.coursecontent.forEach(section => {

            section.subsection.forEach(subsection => {

                lecturearray.push(subsection._id);

            })

        })

        courseprogress.completedvideos = lecturearray;

        await courseprogress.save();

        return res.status(200).json({

            success:true,
            message:"Course completed successfully"

        })

    } catch(err){

        return res.status(500).json({

            success:false,
            message:`Error in updating course progress : ${err}`

        })

    }

}