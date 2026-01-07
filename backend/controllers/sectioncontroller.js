const sectionmod = require("../models/sectionmodel");
const subsectionmod = require("../models/subsectionmodel");
const coursemod = require("../models/coursemodel");
const mongoose = require("mongoose");

exports.createsection = async(req,res)=>{

    try {
        
        const{sectionname,courseid} = req.body

        if(!sectionname || !courseid){

            return res.status(400).json({

                success:false,
                message:"all feilds are not present"
            })
        }

        const course = await coursemod.findById(courseid);

        if(!course){

            return res.status(400).json({

                success:false,
                message:"Course not found"
            })
        }

        const newsection = await sectionmod.create({sectionname});

        const updatecoursedb = await coursemod.findByIdAndUpdate(courseid,{$push:{coursecontent:newsection._id}},{new:true}).populate({path:"coursecontent",populate:{path:"subsection"}})

        return res.status(200).json({

            success:true,
            message:"section created successfully",
            data:updatecoursedb
        })

    } catch (error) {
        
        return res.status(500).json({

            success:false,
            message:`Error in creating section in sectioncontroller : ${error}`
        })

    }

}


exports.updatesection = async(req,res)=>{

    try {
        
        const{updatedsectionname,sectionid,courseid} = req.body;

        if(!updatedsectionname || !sectionid || !courseid){

            return res.status(500).json({

                success:false,
                message:"all feilds are not present",
            })

        }

        const section = await sectionmod.findById(sectionid);

        if(!section){

            return res.status(400).json({

                success:false,
                message:"Section not found"
            })
        }

        const course = await coursemod.findById(courseid);

        if(!course){

            return res.status(400).json({

                success:false,
                message:"Course not found"
            })
        }

        const ress = course.coursecontent.includes(new mongoose.Types.ObjectId(sectionid));

        if(!ress){

            return res.status(400).json({

                success:false,
                message:"Section not found in course"
            })
        }

        const updatedsection = await sectionmod.findByIdAndUpdate(sectionid,{sectionname:updatedsectionname},{new:true})

        const updatedcourse = await coursemod.findById(courseid).populate({path:"coursecontent",populate:{path:"subsection"}})

        return res.status(200).json({

            success:true,
            message:"changing name of section completed successfully",
            data:updatedcourse
        })

    } catch (error) {
        
        return res.status(500).json({

            success:false,
            message:`Error in updating course in sectioncontroller : ${error}`
        })

    }

}



exports.deletesection = async(req,res)=>{

    try {
        
        const{courseid,sectionid} = req.body

        if(!sectionid || !courseid){

            return res.status(500).json({

                success:false,
                message:"all feilds are not present",
            })
        }

        const section = await sectionmod.findById(sectionid);

        if(!section){

            return res.status(400).json({

                success:false,
                message:"Section not found"
            })
        }

        const findcourse = await coursemod.findById(courseid);

        if(!findcourse){

            return res.status(400).json({

                success:false,
                message:"Course not found"
            })
        }

        const ress = findcourse.coursecontent.includes(new mongoose.Types.ObjectId(sectionid));

        if(!ress){

            return res.status(400).json({

                success:false,
                message:"Section not found in course"
            })
        }

        const updatedcourse = await coursemod.findByIdAndUpdate(courseid,{$pull:{coursecontent:sectionid}},{new:true})

        await subsectionmod.deleteMany({sectiontowhichitbelong:sectionid});

        const updatedsection = await sectionmod.findByIdAndDelete(sectionid);

        const course = await coursemod.findById(courseid).populate({path:"coursecontent",populate:{path:"subsection"}})

        return res.status(200).json({

            success:true,
            message:"deleting of section completed successfully",
            data:course
        })

    } catch (error) {
        
        return res.status(500).json({

            success:false,
            message:`Error in deleting section in sectioncontroller : ${error}`
        })

    }

}