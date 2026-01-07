const categorymod = require("../models/categorymodel");

function getRandomInt(max) {

    return Math.floor(Math.random() * max)

}

exports.createcategory = async(req,res)=>{

    try {
        
        const{name,description} = req.body

        if(!name || !description){

            return res.status(400).json({

                success:false,
                message:"please give complete details of category"
            })
        }

        const createentry = await categorymod.create({name:name,description:description});

        return res.status(200).json({

            success:true,
            message:"category created successfully"
        })

    } catch (error) {
        
        return res.status(500).json({

            success:false,
            message:`error in creating category in createcategory controller in categorycontroller : ${error}`
        })

    }

}


exports.showallcategory = async(req,res)=>{

    try {
        
        const allcategory = await categorymod.find({});

        return res.status(200).json({

            success:true,
            message:"all category showed successfully",
            data:allcategory
        })

    } catch (error) {
        
        return res.status(500).json({

            success:false,
            message:`error in showing category in showallcategory controller in categorycontroller : ${error}`
        })

    }

}


// this controller will run when we will click on one particular category

exports.categorypagedetails = async(req,res)=>{

    // here one function is left that is to find most selling courses so we will do that later.

    try {
        
        const{categoryid} = req.body

        const allcourses = await categorymod.findById(categoryid).populate({path: "courseswithparticularcategory", match: { status: "Published" },populate:[{path:"teacher",select:"firstname lastname"},{path: "coursecontent",populate:{path:"subsection"}},{path:"ratingandreviews"}]}).exec();

        // if(allcourses.courseswithparticularcategory.length === 0){

        //     return res.status(404).json({

        //         success:false,
        //         message:"No courses found related to mentioned category"
        //     })
        // }
        
        const differentcategory = await categorymod.find({_id:{$ne:categoryid},courseswithparticularcategory:{$exists:true,$not:{$size:0}}}).populate({path: "courseswithparticularcategory", match: { status: "Published" },populate:[{path:"teacher",select:"firstname lastname"},{path: "coursecontent",populate:{path:"subsection"}},{path:"ratingandreviews"}]}).exec();

        let randomCategory = null;

        if (differentcategory.length > 0) {

            randomCategory = differentcategory[getRandomInt(differentcategory.length)];

        }

        if(!differentcategory){
            
            return res.status(404).json({
                
                success:false,
                message:"No different category found"
            })
        }

        return res.status(200).json({

            success:true,
            message:"successfully showing courses",
            data:{
                
                allcourses,
                randomCategory
            }
        })

    } catch (error) {
        
        return res.status(500).json({

            success:false,
            message:`Error in showing courses related and not related to category in category controller : ${error}`
        })

    }

}