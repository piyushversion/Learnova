const sectionmod = require("../models/sectionmodel");
const subsectionmod = require("../models/subsectionmodel");
const coursemod = require("../models/coursemodel");
const uploadfile = require("../utils/fileUpload")

exports.createsubsection = async(req,res)=>{

    try {
        
        const{sectionid,subsectionname,subsectiondescription,courseid} = req.body

        const subsectionvideo = req.files.videofiles;

        if(!sectionid || !subsectionname || !subsectiondescription || !subsectionvideo || !courseid){

            return res.status(400).json({

                success:false,
                message:"all feilds are required"
            })
        }

        const course = await coursemod.findById(courseid);

        if(!course){

            return res.status(404).json({

                success:false,
                message:"course not found"
            })

        }

        const section = await sectionmod.findById(sectionid)

        if(!section){

            return res.status(404).json({

                success:false,
                message:"section not found"
            })

        }

        const uploadvideo = await uploadfile(subsectionvideo,"Learnova");

        const createsubsection = await subsectionmod.create({title:subsectionname,description:subsectiondescription,timeduration:uploadvideo.duration,videourl:uploadvideo.secure_url,sectiontowhichitbelong:sectionid})

        const updatedsection = await sectionmod.findByIdAndUpdate(sectionid,{$push:{subsection:createsubsection._id}},{new:true}).populate("subsection")

        const updatedcourse = await coursemod.findById(courseid).populate({path:"coursecontent",populate:{path:"subsection"}})

        return res.status(200).json({

            success:true,
            message:"subsection created successfully",
            data:updatedcourse
        })

    } catch (error) {

        console.log(error);
        console.log(error.message);
        
        return res.status(400).json({

            success:false,
            message:`Error in creating sub section in subsection controller : ${error}`
        })

    }

}


exports.updatesubsection = async(req,res)=>{

    try {
        
        const{sectionid,subsectionname,subsectiondescription,subsectionid,courseid} = req.body

        let subsectionvideo = null;

        if(req.files){

            subsectionvideo = req.files.video;

        }

        const course = await coursemod.findById(courseid);

        if(!course){

            return res.status(404).json({

                success:false,
                message:"course not found"
            })

        }

        const subsection = await subsectionmod.findById(subsectionid)

        if(!subsection){

            return res.status(404).json({

                success: false,
                message: "SubSection not found",

            })
        }

        if(subsection.sectiontowhichitbelong.toString() !== sectionid){

            return res.status(400).json({

                success:false,
                message:"Subsection does not belong to this section"
            })

        }

        if(subsectionname){

            await subsectionmod.findByIdAndUpdate(subsectionid,{title:subsectionname})

        }

        if(subsectiondescription){

            await subsectionmod.findByIdAndUpdate(subsectionid,{description:subsectiondescription})

        }

        if(subsectionvideo){

            const uploadvideo = await uploadfile(subsectionvideo,"Learnova")

            await subsectionmod.findByIdAndUpdate(subsectionid,{videourl:uploadvideo.secure_url,timeduration:uploadvideo.duration})

        }

        const updatedcourse = await coursemod.findById(courseid).populate({path:"coursecontent",populate:{path:"subsection"}})

        return res.status(200).json({

            success:true,
            message:"updation of subsection completed successfully",
            data:updatedcourse
        })

    } catch (error) {
        
        return res.status(500).json({

            success:false,
            message:`Error in updation of subsection in subsection controller : ${error}`
        })

    }

}


exports.deletesubsection = async(req,res)=>{

    try {
        
        const{subsectionid,sectionid,courseid} = req.body

        if(!subsectionid || !sectionid || !courseid){

            return res.status(500).json({

                success:false,
                message:"all feilds are not present",
            })
        }

        const subsection = await subsectionmod.findById(subsectionid);

        if(!subsection){

            return res.status(404).json({

                success:false,
                message:"subsection not found"
            })

        }

        const section = await sectionmod.findById(sectionid);

        if(!section){

            return res.status(404).json({

                success:false,
                message:"section not found"
            })

        }

        const course = await coursemod.findById(courseid);

        if(!course){

            return res.status(404).json({

                success:false,
                message:"course not found"
            })

        }

        if(subsection.sectiontowhichitbelong.toString() !== sectionid){

            return res.status(400).json({

                success:false,
                message:"Subsection does not belong to this section"
            })

        }

        const updatesection = await sectionmod.findByIdAndUpdate(sectionid,{$pull:{subsection:subsectionid}})

        const deletesubsection = await subsectionmod.findByIdAndDelete(subsectionid)

        const updatedcourse = await coursemod.findById(courseid).populate({path:"coursecontent",populate:{path:"subsection"}})

        return res.status(200).json({

            success:true,
            message:"deleting of subsection completed successfully",
            data:updatedcourse
        })

    } catch (error) {
        
        return res.status(500).json({

            success:false,
            message:`Error in deleting subsection in subsection controller : ${error}`
        })
        
    }

}