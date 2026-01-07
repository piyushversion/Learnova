const usermod = require("../models/usermodel")
const profilemod = require("../models/profilemodel")
const coursemod = require("../models/coursemodel");
const courseprogressmod = require("../models/courseprogressmodel");
const ratingandreviewsmod = require("../models/ratingandreviewsmodel");
const uploadfile = require("../utils/fileUpload");
const { sectodur } = require("../utils/secondstoduration");

exports.updateprofile = async(req,res)=>{

    try {
        
        const{firstname,lastname,gender,dateofbirth,about,contactnumber} = req.body

        const userid = req.attachtoken.id;

        const userdetails = await usermod.findById(userid);

        const profileid = userdetails.additionaldetails;

        if(firstname){

            await usermod.findByIdAndUpdate(userid,{firstname:firstname});

        }
        if(lastname){

            await usermod.findByIdAndUpdate(userid,{lastname:lastname});

        } else{

            await usermod.findByIdAndUpdate(userid,{lastname:null});

        }
        if(gender){

            await profilemod.findByIdAndUpdate(profileid,{gender:gender});

        } else{

            await profilemod.findByIdAndUpdate(profileid,{gender:null});

        }
        if(dateofbirth){

            await profilemod.findByIdAndUpdate(profileid,{dateofbirth:dateofbirth});

        } else{

            await profilemod.findByIdAndUpdate(profileid,{dateofbirth:null});

        }
        if(about){

            await profilemod.findByIdAndUpdate(profileid,{about:about});

        } else{

            await profilemod.findByIdAndUpdate(profileid,{about:null});

        }
        if(contactnumber){

            await profilemod.findByIdAndUpdate(profileid,{contactnumber:contactnumber});

        } else{

            await profilemod.findByIdAndUpdate(profileid,{contactnumber:null});

        }

        const updateduser = await usermod.findById(userid).populate("additionaldetails")

        return res.status(200).json({

            success:true,
            message:"profile updated successfully",
            data:updateduser
        })

    } catch (error) {
        
        return res.status(400).json({

            success:false,
            message:`Error in updating profile in profile controller : ${error}`
        })

    }

}


exports.getalldetailsofuser = async(req,res)=>{

    try {
        
        const userid = req.attachtoken.id

        if(!userid){

            return res.json(400).json({

                success:false,
                message:"User id not found"

            })

        }

        const userdetails = await usermod.findById(userid)

        if(!userdetails){

            return res.json(400).json({

                success:false,
                message:"User details not found"

            })

        }

        const userdetailss = await usermod.findById(userid).populate("additionaldetails").exec();

        return res.status(200).json({

			success: true,
			message: "User Data fetched successfully",
			data: userdetailss
		});

    } catch (error) {
        
        return res.status(500).json({

			success: false,
			message: `Error in fetching details in profile controller : ${error}`

		})

    }

}


exports.updateprofilepicture = async(req,res)=>{

    try {
        
        const picture = req.files.profilepicture

        const userid = req.attachtoken.id;

        const image = await uploadfile(picture,"Learnova")

        const updateuser = await usermod.findByIdAndUpdate(userid,{image:image.secure_url},{new:true})

        return res.status(200).json({

            success:true,
            message:"Profile picture updated successfully",
            data:updateuser

        })

    } catch (error) {
        
        return res.status(500).json({

            success: false,
            message: `Error in updating profile in profile controller : ${error}`

          })

    }

}


exports.getenrolledcoursesofparticularstudent = async(req,res)=>{

    try {
        
        const userid = req.attachtoken.id;

        let userdetails = await usermod.findById(userid).populate({path:"courses",populate:{path:"coursecontent",populate:{path:"subsection"}}}).exec();

        if(!userdetails){

            return res.status(400).json({

                success: false,
                message: `Could not find user with id : ${userid}`

            })

        }

        userdetails = userdetails.toObject();        

        let subsectionlength = 0;

        for(let i=0;i<userdetails.courses.length;i++){

            let totaldurationinsec = 0;

            subsectionlength = 0;

            for(let j=0;j<userdetails.courses[i].coursecontent.length;j++){

                totaldurationinsec += userdetails.courses[i].coursecontent[j].subsection.reduce((acc,curr)=> acc + parseInt(curr.timeduration),0);

                userdetails.courses[i].totaldur = sectodur(totaldurationinsec);

                subsectionlength += userdetails.courses[i].coursecontent[j].subsection.length

            }

            let courseprogress = await courseprogressmod.findOne({courseid:userdetails.courses[i]._id,userid:userid})

            let completedvideoslength = courseprogress.completedvideos.length;

            userdetails.courses[i].progresspercentage = (completedvideoslength/subsectionlength) * 100;

        }

        return res.status(200).json({

            success: true,
            data: userdetails

        })

    } catch (error) {
        
        return res.status(400).json({

            success: false,
            message: `Error in fetching courses in profile controller : ${error}`
        })

    }

}

exports.getinstructorstats = async(req,res)=>{

    try{

        const courses = await coursemod.find({teacher:req.attachtoken.id,status:"Published"}).sort({createdat:-1}).populate("studentenrolled").populate("ratingandreviews").populate("coursecontent");

        let totalStudents = 0;
        let totalRevenue = 0;
        let totalReviews = 0;
        let totalCourses = 0;
        let instructorOverallRating = 0;

        const courseStats = [];

        for (const course of courses) {

            // console.log("CourseContent",course.coursecontent);

            const students = course.studentenrolled.length;

            const revenue = students * (course.price || 0);

            const avgRating = course.ratingandreviews.length > 0 ? course.ratingandreviews.reduce((sum, r) => sum + r.rating, 0) / course.ratingandreviews.length : 0;

            const totalreviewsofcourse = course.ratingandreviews.length;

            totalStudents += students;
            totalRevenue += revenue;
            totalReviews += course.ratingandreviews.length;

            // Completion rate (based on course progress)

            //             CourseContent [
//   {
//     _id: new ObjectId('68e50299d589bb0e2b98b3aa'),
//     sectionname: 'Introduction to Gen AI',
//     subsection: [ new ObjectId('68e50323d589bb0e2b98b3b0') ],
//     __v: 0
//   },
//   {
//     _id: new ObjectId('68e5032fd589bb0e2b98b3b8'),
//     sectionname: 'Types of Models',
//     subsection: [ new ObjectId('68e50366d589bb0e2b98b3bf') ],
//     __v: 0
//   },
//   {
//     _id: new ObjectId('68e50378d589bb0e2b98b3c7'),
//     sectionname: 'Types of LLM',
//     subsection: [ new ObjectId('68e503b9d589bb0e2b98b3ce') ],
//     __v: 0
//   },
//   {
//     _id: new ObjectId('68e503cbd589bb0e2b98b3d6'),
//     sectionname: 'Section 4',
//     subsection: [ new ObjectId('68e503ead589bb0e2b98b3dd') ],
//     __v: 0
//   },
//   {
//     _id: new ObjectId('68e503ffd589bb0e2b98b3e5'),
//     sectionname: 'Section 5',
//     subsection: [
//       new ObjectId('68e50422d589bb0e2b98b3ec'),
//       new ObjectId('68e50447d589bb0e2b98b3f5')
//     ],
//     __v: 0
//   },
//   {
//     _id: new ObjectId('68e50457d589bb0e2b98b3fd'),
//     sectionname: 'Section 6',
//     subsection: [ new ObjectId('68e50519d589bb0e2b98b404') ],
//     __v: 0
//   }
// ]
            let totalvideos = 0;

            course.coursecontent.forEach((section)=>{

                totalvideos += section.subsection.length;

            })

            let progarray = [];

            let comprate = null;

            const progresses = await courseprogressmod.find({ courseid: course._id });

            if(progresses.length === 0){

                comprate = 0;

            } else{

                progresses.forEach((progress)=>{

                    progarray.push(Math.trunc(((progress.completedvideos.length) / totalvideos)*100));

                })

                comprate = Math.trunc(progarray.reduce((sum,acc)=>sum+acc,0) / progarray.length) ;

            }

            // console.log("Progress",progresses);

// Progress []
// Progress [
//   {
//     _id: new ObjectId('68e2a763c971fddb126cf2d6'),
//     courseid: new ObjectId('68d8fc965d51e74ea041f325'),
//     userid: new ObjectId('68d8f0005d51e74ea041f2e4'),
//     completedvideos: [
//       new ObjectId('68d8fcce5d51e74ea041f330'),
//       new ObjectId('68d8fd0c5d51e74ea041f33f')
//     ],
//     __v: 2
//   },
//   {
//     _id: new ObjectId('68e7b6f1b457fd4c521b14e3'),
//     courseid: new ObjectId('68d8fc965d51e74ea041f325'),
//     userid: new ObjectId('68bc78bc556efb471b8ce1ac'),
//     completedvideos: [],
//     __v: 0
//   }
// ]
// Progress [
//   {
//     _id: new ObjectId('68d96407c97a19ba2d46e30f'),
//     courseid: new ObjectId('68d8fe8f5d51e74ea041f363'),
//     userid: new ObjectId('68bc78bc556efb471b8ce1ac'),
//     completedvideos: [ new ObjectId('68d8ff995d51e74ea041f370') ],
//     __v: 1
//   }
// ]
// Progress [
//   {
//     _id: new ObjectId('68e2a2afca7345003994d850'),
//     courseid: new ObjectId('68d902435d51e74ea041f3a6'),
//     userid: new ObjectId('68d8f0005d51e74ea041f2e4'),
//     completedvideos: [
//       new ObjectId('68d9025c5d51e74ea041f3b1'),
//       new ObjectId('68d9027b5d51e74ea041f3c0'),
//       new ObjectId('68d902d85d51e74ea041f3c9')
//     ],
//     __v: 3
//   }
// ]
// Progress [
//   {
//     _id: new ObjectId('68dd7cf528763a74e6627c3b'),
//     courseid: new ObjectId('68dba004ee1a02ee8a2c649b'),
//     userid: new ObjectId('68bc78bc556efb471b8ce1ac'),
//     completedvideos: [ new ObjectId('68dba0b5ee1a02ee8a2c64a6') ],
//     __v: 1
//   }
// ]
// Progress [
//   {
//     _id: new ObjectId('68e5056fd589bb0e2b98b42b'),
//     courseid: new ObjectId('68e50281d589bb0e2b98b3a5'),
//     userid: new ObjectId('68d8f0005d51e74ea041f2e4'),
//     completedvideos: [
//       new ObjectId('68e50323d589bb0e2b98b3b0'),
//       new ObjectId('68e50366d589bb0e2b98b3bf'),
//       new ObjectId('68e503b9d589bb0e2b98b3ce'),
//       new ObjectId('68e503ead589bb0e2b98b3dd'),
//       new ObjectId('68e50422d589bb0e2b98b3ec'),
//       new ObjectId('68e50447d589bb0e2b98b3f5'),
//       new ObjectId('68e50519d589bb0e2b98b404')
//     ],
//     __v: 7
//   }
// ]

            // const completedUsers = progresses.filter((p) => p.completedvideos && p.completedvideos.length > 0).length;

            // const completionRate = progresses.length > 0 ? (completedUsers / progresses.length) * 100 : 0;

            courseStats.push({

                coursename: course.coursename,
                courseimage:course.thumbnail,
                students,
                revenue,
                avgRating: avgRating.toFixed(1),
                totalreviewsofcourse,
                completionRate: comprate

            });
        }

        // instructorOverallRating = courseStats.length > 0 ? (courseStats.reduce((sum, c) => sum + c.avgRating * c.students,0) / totalStudents).toFixed(1) : 0;


        // “Find all reviews where the field courseonwhichrargiven matches any course ID from the instructor’s courses.”

        const allReviews = await ratingandreviewsmod.find({courseonwhichrargiven:{ $in: courses.map((c) => c._id)},}).sort({createdat:-1}).populate("userwhohasgivenrar","firstname lastname").populate("courseonwhichrargiven","coursename");
        
        const arrayss = allReviews.map((rar)=>{

            return rar.rating;

        })

        instructorOverallRating = (arrayss.reduce((sum,acc) => sum + acc,0) / arrayss.length).toFixed(1);

// All Reviews [
//   {
//     _id: new ObjectId('68e40d4ac249b15a4da8f7c4'),
//     userwhohasgivenrar: new ObjectId('68d8f0005d51e74ea041f2e4'),
//     rating: 4,
//     reviews: 'Very Good',
//     courseonwhichrargiven: new ObjectId('68d90f1c1a97011b7d268054'),
//     __v: 0
//   },
//   {
//     _id: new ObjectId('68e40d6ec249b15a4da8f7e1'),
//     userwhohasgivenrar: new ObjectId('68d8f0005d51e74ea041f2e4'),
//     rating: 3.5,
//     reviews: 'kjk',
//     courseonwhichrargiven: new ObjectId('68d912b31a97011b7d2680cf'),
//     __v: 0
//   },
//   {
//     _id: new ObjectId('68e41347f02da239e1d0c107'),
//     userwhohasgivenrar: new ObjectId('68bc78bc556efb471b8ce1ac'),
//     rating: 3,
//     reviews: 'Best',
//     courseonwhichrargiven: new ObjectId('68d90d491a97011b7d268038'),
//     __v: 0
//   }
// ]

        const positive = allReviews.filter((r) => r.rating >= 4).length;

        const negative = allReviews.filter((r) => r.rating <= 2).length;

        totalCourses = courses.length;


        // const stats = courses.map((course) => {

        //     const totalstudents = course.studentenrolled.length;

        //     const revenue = totalstudents*course.price

        //     const avgrating = course.ratingandreviews.length > 0 ? course.ratingandreviews.reduce((sum, r) => sum + r.rating, 0) /
        //     course.ratingandreviews.length : 0

        //     return {

        //         courseid:course._id,
        //         coursename:course.coursename,
        //         coursedescription:course.coursedescription,
        //         courseimage:course.thumbnail,
        //         totalstudents,
        //         revenue,
        //         avgrating
        //     }

        // })

        return res.status(200).json({

            success:true,
            data:{

                courseStats,
                totalCourses,
                totalStudents,
                totalRevenue,
                reviewsSentiment: { positive, negative },
                instructorOverallRating,
                allReviews
            }

        })

    } catch(error){

        return res.status(400).json({

            success: false,
            message: `Error in getting instructor stats in profile controller : ${error}`
        })

    }

}