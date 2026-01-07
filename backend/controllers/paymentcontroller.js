const razorpay = require("razorpay");
const usermod = require("../models/usermodel");
const coursemod = require("../models/coursemodel");
const courseprogressmod = require("../models/courseprogressmodel");
const { default: mongoose } = require("mongoose");
const {courseEnrollmenttemplate} = require("../mailtemplates/courseenrollment");
const mailsender = require("../utils/mailSender");
const crypto = require("crypto");

const { paymentsuccessfullemail } = require("../mailtemplates/paymentsuccessfull");

require("dotenv").config();

// Now how payment integration works

// When ever we click on pay button on frontend request comes on the below controller and we will create order for that course. now after order is created we will see the razorpay modal which will include different types of payment methods. now after paying money or we can say after money is been deducted from our bank account we will verify payment using the verifypayment controller ie: after payment the request will come to the controller below this controller.

// exports.createorder = async(req,res)=>{

//     try {
        
//         const{courseid} = req.body;

//         const userid = req.attachtoken.id

//         if(!courseid){

//             return res.status(400).json({

//                 success:false,
//                 message:"please provide courseid"
//             })
//         }

//         let coursedetails = await coursemod.findById(courseid);

//         if(!coursedetails){

//             return res.status(400).json({

//                 success:false,
//                 message:"could'n find the course"
//             })

//         }

//         // now inside coursemodel it contains array of objectid of studentenrolled who has purchased the course.so you can check/verify that the user who is buying this course has already purchased the course or not.

//         // now the userid that is here is in string format and the userid inside the array of studentenrolled is in the form of objectid, therefore convert the userid into objectid.

//         const useridd = new mongoose.Types.ObjectId(userid);

//         if(coursedetails.studentenrolled.includes(useridd)){

//             return res.status(400).json({

//                 success:false,
//                 message:"Student already enrolled for this course"
//             })

//         }

//         const amount = coursedetails.price;

//         const currency = "INR";

//         const options = {

//             amount:amount*100,
//             currency:currency,
//             receipt:Math.floor(Math.random(Date.now())*100000000000),
//             notes:{

//                 courseid:courseid,
//                 userid:userid
//             }

//         }

//         try {
            
//             const instance = new razorpay({key_id:process.env.keyid,key_secret:process.env.keysecret})

//             const order = instance.orders.create(options);

//             return res.status(200).json({

//                 success:true,
//                 coursename:coursedetails.coursename,
//                 coursedescription:coursedetails.coursedescription,
//                 thumbnail:coursedetails.thumbnail,
//                 orderid:order.id,
//                 currency:order.currency,
//                 amount:order.amount,
//                 message:"order created successfully"
//             })



//         } catch (error) {
            
//             return res.status(400).json({

//                 success:false,
//                 message:`failed to create the order in paymentcontroller : ${error}`
//             })

//         }

//     } catch (error) {
        
//         return res.status(400).json({

//             success:false,
//             message:`failed to create the payment in payment controller : ${error}`
//         })

//     }

// }


// exports.verifypayment = async(req,res)=>{

//     try {
        
//         const webhookseceret = "12345";

//         // now this below secret is in the encrypted format and the above webhooksecret is in different format so we cannot convert below secret into above secret format but we can convert above secret format into below secret format using three steps.

//         const secret = req.headers("x-razorpay-signature");

//         const shasum = crypto.createHmac("sha256",webhookseceret); // step - 1
//         shasum.update(JSON.stringify(req.body)); // step - 2
//         const digest = shasum.digest("hex"); // step - 3

//         //now if our signature and digest matches then we say that our payment is authorized.

//         if(secret === digest){

//         console.log("payment is authorized");

//         // now our payment is authorized then we have to perform some action now action is that we have to enroll that student into that course ie:- we have to give that course to that student.

//         // so if user has purchased the course then we have to insert objectid of that course into array of courses in user model.

//         // similarly we have to insert objectid of user in array of studentenrolled in coursemodel.

//         // now to insert we need courseid and userid and we will get it from notes that we have created in the options.

//         // note : this request is not coming from frontend it is coming from razorpay, so this is how you fetch courseid and userid.

//         const{courseid,userid} = req.body.payload.payment.entity.notes

//         try {
            
//             const insertintocoursemod = await coursemod.findByIdAndUpdate(courseid,{$push:{studentenrolled:userid}},{new:true});

//             if(!insertintocoursemod){

//                 return res.status(500).json({

//                     success:false,
//                     message:"course not found"
//                 })
//             }

//             const insertintousermod  = await usermod.findByIdAndUpdate(userid,{$push:{courses:courseid}},{new:true});

//             if(!insertintousermod){

//                 return res.status(500).json({

//                     success:false,
//                     message:"user not found"
//                 })
//             }   

//             const sendmail = await mailsender(insertintousermod.email,"Greetings","Congragulations you have successfully purchased the course")

//             return res.status(200).json({

//                 success:true,
//                 message:"Signature verified and course added"
//             })

//         } catch (error) {
            
//             return res.status(500).json({

//                 success:false,
//                 message:"Insertion failed"
//             })

//         }

//         }


//     } catch (error) {
        
//         return res.status(500).json({

//             success:false,
//             message:`Eoor in verifying payment in payment controller : ${error}`
//         })

//     }

// }

exports.freeenrollment = async(req,res) => {

    const {courseid} = req.body;

    const userid = req.attachtoken.id;

    if (!courseid || !userid) {

        throw new Error("Please Provide all the details");

    }

    const coursedetails = await coursemod.findById(courseid);

    if(!coursedetails){

        return res.status(400).json({

            success:false,
            message:"could'n find the course"

        })

    }

    const useridd = new mongoose.Types.ObjectId(userid);

    if(coursedetails.studentenrolled.includes(useridd)){

        return res.status(400).json({

            success:false,
            message:"Student already enrolled for this course"
        })

    }

    try{

        const enrolledcourse = await coursemod.findOneAndUpdate({_id:courseid},{$push:{studentenrolled:userid}},{new:true});

        if (!enrolledcourse) {

            throw new Error("Course not found");

        }

        const courseprogress = await courseprogressmod.create({

            courseid:courseid,
            userid:userid,
            completedvideos:[]
                
        }) 

        const enrolledstudent = await usermod.findByIdAndUpdate(userid,{$push:{courses:courseid,courseprogress:courseprogress._id}},{new:true})

        await mailsender(enrolledstudent.email,`Enrollment successfull into ${enrolledcourse.coursename}`,courseEnrollmenttemplate(enrolledcourse.coursename,`${enrolledstudent.firstname} ${enrolledstudent.lastname}`))

        return res.status(200).json({

            success:true,
            message:"Enrollment Successfull"

        })


    } catch(err){

        return res.status(400).json({ 
                
            success: false,
            error: err.message
            
        })

    }

}

exports.createOrder = async(req,res) => {

    try{ 

        const{courses,Total} = req.body;

        const userid = req.attachtoken.id;

        if(courses.length === 0){

            return res.status(400).json({

                success:false,
                message:"please provide courses"
            })
        }

        let totalamount = 0;

        for(const courseid of courses){

            let coursedetails;

            coursedetails = await coursemod.findById(courseid);

            if(!coursedetails){

                return res.status(400).json({

                    success:false,
                    message:"could'n find the course"
                })

            }

            const useridd = new mongoose.Types.ObjectId(userid);

            if(coursedetails.studentenrolled.includes(useridd)){

                return res.status(400).json({

                    success:false,
                    message:"Student already enrolled for this course"
                })

            }

            totalamount += coursedetails.price;

        }

        const currency = "INR";

        if(Total){

            totalamount = Total;

        }

        const options = {

            amount:totalamount*100,
            currency:currency,
            receipt:`${Math.floor(Math.random(Date.now())*100000000000)}`

        }
            
        const instance = new razorpay({key_id:process.env.keyid,key_secret:process.env.keysecret})
        
        const orderresponse = await instance.orders.create(options);

        // return res.status(200).json({
        //     success:true,
        //     coursename:coursedetails.coursename,
        //     coursedescription:coursedetails.coursedescription,
        //     thumbnail:coursedetails.thumbnail,
        //     orderid:order.id,
        //     currency:order.currency,
        //     amount:order.amount,
        //     message:"order created successfully"
        // })

        res.json({
                
            success: true,
            data: orderresponse,
        })

    } catch(error){

        console.log(error);

        return res.status(400).json({

            success:false,
            message:`failed to create the order in paymentcontroller : ${error}`
        })

    }

}

exports.verifyPayment = async(req,res)=>{

    try{
    
    const razorpayorderid = req.body.body.razorpay_order_id;
    const razorpaypaymentid = req.body.body.razorpay_payment_id;
    const razorpaysignature = req.body.body.razorpay_signature;
    const courses = req.body.body.courses;
    const userid = req.attachtoken.id;

    if (!razorpayorderid || !razorpaypaymentid || !razorpaysignature || !courses || !userid) {

        return res.status(400).json({ 
            
            success: false, message: "Payment Failed"

        })

    }

    let body = razorpayorderid + "|" + razorpaypaymentid;

    const exsignature = crypto.createHmac("sha256",process.env.keysecret).update(body.toString()).digest("hex");

    if(exsignature === razorpaysignature){

        try{
            
            await enrollstudents(courses,userid,res);
            
            return res.status(200).json({ 
                
                success: true, message: "Payment Verified Successfully" 
                
            })

        } catch(err){

            return res.status(400).json({ success: false, error: err.message });

        }

    }

    return res.status(400).json({ 
        
        success: false, message: "Payment Verification failed" 
    
    })

    } catch(error){

        console.error("Verify payment error:", error);
        return res.status(500).json({ success: false, message: "Error verifying payment" });

    }

}

const enrollstudents = async(courses,userid,res) => {

    if (!courses || !userid || !res) {

        throw new Error("Please Provide all the details");

    }

    for(const courseid of courses){

        try{

            const enrolledcourse = await coursemod.findOneAndUpdate({_id:courseid},{$push:{studentenrolled:userid}},{new:true});

            if (!enrolledcourse) {

                throw new Error("Course not found");

            }

            const courseprogress = await courseprogressmod.create({

                courseid:courseid,
                userid:userid,
                completedvideos:[]
                
            }) 

            const enrolledstudent = await usermod.findByIdAndUpdate(userid,{$push:{courses:courseid,courseprogress:courseprogress._id}},{new:true})

            await mailsender(enrolledstudent.email,`Enrollment successfull into ${enrolledcourse.coursename}`,courseEnrollmenttemplate(enrolledcourse.coursename,`${enrolledstudent.firstname} ${enrolledstudent.lastname}`))


        } catch(err){

            return res.status(400).json({ 
                
                success: false,
                error: err.message
            
            })

        }

    }

}


exports.sendpaymentsuccessfullmail = async(req,res) => {

    const { orderid, paymentid, amount } = req.body

    const userid = req.attachtoken.id;

    if (!orderid || !paymentid || !amount || !userid) {

        return res.status(400).json({ 
            
            success: false,
            message: "Please provide all the details" 
        })
    }

    try{

        const enrolledstudent = await usermod.findById(userid);

        await mailsender(enrolledstudent.email,"Payment Received",paymentsuccessfullemail(`${enrolledstudent.firstname} ${enrolledstudent.lastname}`,amount/100,orderid,paymentid));

    } catch(err){

        console.log(err);

        return res.status(400).json({ 
            
            success: false,
            message: "Could not send email"
        })

    }
}