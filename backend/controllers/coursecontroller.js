const categorymod = require("../models/categorymodel");
const usermod = require("../models/usermodel");
const courseprogressmod = require("../models/courseprogressmodel");
const coursemod = require("../models/coursemodel");
const ratingandreviewsmod = require("../models/ratingandreviewsmodel");
const sectionmod = require("../models/sectionmodel")
const subsectionmod = require("../models/subsectionmodel")
const uploadfile = require("../utils/fileUpload");
const { sectodur } = require("../utils/secondstoduration");


exports.createcourse = async(req,res)=>{

    try {

        const userid = req.attachtoken.id

        const{coursetitle,coursedescription,whatyouwilllearn,courseprice,coursecategory,courselanguage} = req.body

        const thumbnail = req.files.thumbnailimage

        if(!coursetitle || !coursedescription || !whatyouwilllearn || !courseprice || !coursecategory || !thumbnail || !courselanguage){

            return res.status(400).json({
				success: false,
				message: "All Fields are not present",
			});

        }

        const teacherdetails = await usermod.findOne({ 
			
			_id: userid, 
    		accounttype: "Instructor" 
		});

        if(!teacherdetails){

            return res.status(404).json({

				success: false,
				message: "Instructor Details Not Found",

			});

        }

        const categorydetails = await categorymod.findById(coursecategory)

        if (!categorydetails) {

			return res.status(404).json({

				success: false,
				message: "Category Details Not Found",

			});

		}

        const thumbnailresponse = await uploadfile(thumbnail,"Learnova");

        const newcourse = await coursemod.create({

            coursename:coursetitle,
            coursedescription:coursedescription,
            whatyouwilllearn:whatyouwilllearn,
            price:courseprice,
			courselanguage:courselanguage,
            category:coursecategory,
            teacher:teacherdetails._id,
            thumbnail:thumbnailresponse.secure_url,
            createdat:Date.now()            
        })

        await usermod.findByIdAndUpdate({_id:teacherdetails._id},{$push:{courses:newcourse._id}},{new:true})

        await categorymod.findByIdAndUpdate({_id:coursecategory},{$push:{courseswithparticularcategory:newcourse._id}},{new:true})

        res.status(200).json({

			success: true,
			message: "Course Created Successfully",
			data: newcourse,
		});

    } catch (error) {
        
        res.status(500).json({

			success: false,
			message: `Failed to create course in createcourse controllers in coursecontroller : ${error}`
		});

    }

}


exports.getallcourses = async (req, res) => {

	try {
		const allcourses = await coursemod.find(
			{},
			{
				coursename: true,
				price: true,
				thumbnail: true,
				teacher: true,
				ratingandreviews: true,
				studentenrolled: true,
			}
		).populate("teacher").exec();

		return res.status(200).json({

			success: true,
			data: allcourses,

		});
	} 
    catch (error) {

		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data in getallcourse in coursecontroller : ${error}`
		});
	}
};


exports.getfulldetailsofparticularcourse = async(req,res)=>{

	try {
		
		const{courseid} = req.body;

		let coursedetails = await coursemod.findById(courseid).populate({path:"teacher",populate:{path:"courses",populate:{path:"ratingandreviews"}}}).populate("ratingandreviews").populate({path:"coursecontent",populate:{path:"subsection"}}).exec();

		if(!coursedetails){

			return res.status(400).json({

				success:false,
				message:`could not find the course with courseid ${courseid}` 
			})
		}

		let totaldurationinsec = 0;

		for(let i=0;i<coursedetails.coursecontent.length;i++){

          for(let j=0;j<coursedetails.coursecontent[i].subsection.length;j++){

              totaldurationinsec += parseInt(coursedetails.coursecontent[i].subsection[j].timeduration);

          }

      	}

		const finalduration = sectodur(totaldurationinsec);

		coursedetails = coursedetails.toObject();

		coursedetails.totalduration = finalduration;

		const allReviews = await ratingandreviewsmod.find({courseonwhichrargiven:{ $in: coursedetails.teacher.courses.map((c) => c._id)},});
						
		const arrayss = allReviews.map((rar)=>{
		
			return rar.rating;
		
		})
		
		const instructorOverallRating = (arrayss.reduce((sum,acc) => sum + acc,0) / arrayss.length).toFixed(1);

		coursedetails.instructorOverallRating = instructorOverallRating;

		return res.status(200).json({

			success:true,
			message:`course details fetched successfully with courseid ${courseid}`, 
			data:coursedetails
		})

	} catch (error) {
		
		return res.status(400).json({

			success:false,
			message:`Some error occured in course controller : ${error}` 
		})

	}

}

exports.getfulldetailsofcourse = async(req,res)=>{

	try {
		
		const{courseid} = req.body;

		const userid = req.attachtoken.id;

		let coursedetails = await coursemod.findById(courseid).populate({path:"teacher"}).populate("ratingandreviews").populate({path:"coursecontent",populate:{path:"subsection"}}).exec();

		if(!coursedetails){

			return res.status(400).json({

				success:false,
				message:`could not find the course with courseid ${courseid}` 
			})
		}

		let courseprogress = await courseprogressmod.findOne({courseid:courseid,userid:userid});

		if(!courseprogress){

			return res.status(400).json({

				success:false,
				message:`Could not find the course progress` 
			})
		}

		let totaldurationinsec = 0;

		for(let i=0;i<coursedetails.coursecontent.length;i++){

          for(let j=0;j<coursedetails.coursecontent[i].subsection.length;j++){

              totaldurationinsec += parseInt(coursedetails.coursecontent[i].subsection[j].timeduration);

          }

      	}

		const finalduration = sectodur(totaldurationinsec);

		coursedetails = coursedetails.toObject();

		coursedetails.totalduration = finalduration;

		coursedetails.completedvideos = courseprogress?.completedvideos ? courseprogress.completedvideos : [];

		coursedetails.courseprogress = courseprogress;

		return res.status(200).json({

			success:true,
			message:`course details fetched successfully with courseid ${courseid}`, 
			data:coursedetails
		})

	} catch (error) {
		
		return res.status(400).json({

			success:false,
			message:`Some error occured in course controller : ${error}` 
		})

	}

}


exports.editcourse = async(req,res)=>{

	try {
		
		const{courseid,coursename,coursedescription,courseprice,coursecategory,coursestatus,whatyouwilllearn,status,courselanguage} = req.body

		let coursethumbnail = null;

		if(req.files){

			coursethumbnail = req.files.coursethumbnail

		}

		const coursedetails = await coursemod.findById(courseid);

		if(!coursedetails){

			return res.status(404).json({

				success:false,
				message: "Course not found" 
			})
		}

		if(coursename){

			await coursemod.findByIdAndUpdate(courseid,{coursename:coursename},{new:true})
		}
		if(coursedescription){

			await coursemod.findByIdAndUpdate(courseid,{coursedescription:coursedescription},{new:true})
		}
		if(courseprice){

			await coursemod.findByIdAndUpdate(courseid,{price:courseprice},{new:true})
		}
		if(courselanguage){

			await coursemod.findByIdAndUpdate(courseid,{courselanguage:courselanguage},{new:true})
		}
		if(coursecategory){

			await coursemod.findByIdAndUpdate(courseid,{category:coursecategory},{new:true});

			await categorymod.findByIdAndUpdate(coursedetails.category,{$pull:{courseswithparticularcategory:courseid}},{new:true});

			await categorymod.findByIdAndUpdate({_id:coursecategory},{$push:{courseswithparticularcategory:courseid}},{new:true});

		}
		if(coursestatus){

			await coursemod.findByIdAndUpdate(courseid,{status:coursestatus},{new:true})
		}
		if(whatyouwilllearn){

			await coursemod.findByIdAndUpdate(courseid,{whatyouwilllearn:whatyouwilllearn},{new:true})

		}
		if(status){

			await coursemod.findByIdAndUpdate(courseid,{status:status},{new:true})

		}
		if(coursethumbnail){

			const thumbnailimage = await uploadfile(coursethumbnail,"Learnova");

			await coursemod.findByIdAndUpdate(courseid,{thumbnail:thumbnailimage.secure_url},{new:true})
		}

		const updatedcourse = await coursemod.findById(courseid).populate({path:"coursecontent",populate:{path:"subsection"}});

		return res.status(200).json({

			success:true,
			message:"Course updated successfully",
			data:updatedcourse
		})


	} catch (error) {
		
		return res.status(400).json({

			success:false,
			message:`Some error occured in course controller while editing course ---> ${error}` 
		})

	}

}


exports.deletecourse = async(req,res)=>{

	try {
		
		const{courseid} = req.body

		const course = await coursemod.findById(courseid);

		if(!course){

			return res.status(400).json({

				success:false,
				message:"Course not found"
			})
		}

		const studentenrolled = course.studentenrolled;

		for(const studentid of studentenrolled){

			await usermod.findByIdAndUpdate(studentid,{$pull:{courses:courseid}},{new:true})

		}

		const teacherid = course.teacher;

		await usermod.findByIdAndUpdate(teacherid,{$pull:{courses:courseid}},{new:true});

		const section = course.coursecontent;

		for(const sectionid of section){

			const sectiondetails = await sectionmod.findById(sectionid);

			if(sectiondetails){

				const subsectiondetails = sectiondetails.subsection

				for(const subsectionid of subsectiondetails){

					await subsectionmod.findByIdAndDelete(subsectionid);

				}

				await sectionmod.findByIdAndDelete(sectionid)

			}
			
		}

		await categorymod.findByIdAndUpdate(course.category,{$pull:{courseswithparticularcategory:courseid}},{new:true})

		await coursemod.findByIdAndDelete(courseid);

		return res.status(200).json({

			success: true,
			message: "Course deleted successfully"

		})


	} catch (error) {
		
		return res.status(400).json({

			success:false,
			message:`some error occured in deleting course in coursecontroller---> ${error}` 
		})

	}

}


exports.getallcoursesofteacher = async(req,res)=>{

	try {
		
		const instructorid = req.attachtoken.id;

		const teachercourses = await coursemod.find({teacher:instructorid}).sort({createdat:-1}).populate({path:"coursecontent",populate:{path:"subsection"}});

		if(!teachercourses){

			return res.status(400).json({

				success:false,
				message:`Course not found in coursecontroller`
			})

		}

		return res.status(200).json({

			success:true,
			message:"Instructor courses fetched successfully",
			data:teachercourses
		})

	} catch (error) {
		
		return res.status(400).json({

			success:false,
			message:`some error occured in getallcoursesofteacher in course controller ---> ${error}` 

		})

	}

}