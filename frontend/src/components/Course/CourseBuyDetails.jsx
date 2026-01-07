import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactStars from "react-stars";
import { GoPeople } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { IoPlayOutline } from "react-icons/io5";
import { PiStarFill } from "react-icons/pi";
import { FiCheckCircle } from "react-icons/fi";
import { IoShareSocial } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { LuClock } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom"
import learnova from "../../assets/utilities image/learnova1.png";
import learnova1 from "../../assets/utilities image/about-01.png";
import { apiconnector } from "../../services/apiconnector";
import { courseurl, paymenturl } from "../../services/apis";
import Footer from "../Details/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "../../redux/Cartslice";
import { sectodur } from "../../utils/duration";
import { getaveragerating } from "../../utils/averagerating";
import { MoonLoader } from "react-spinners";

export const CourseBuyDetails = () => {

  const navi = useNavigate();

  const dispatch = useDispatch();

  const token = useSelector(state => state.Auth.token);

  const userdata = useSelector((state)=> state.User.user);

  const{courseid} = useParams();

  const[loading,setLoading] = useState(true);

  const[initiatePaymentLoading,setInitiatePaymentLoading] = useState(false);

  const[verifyingPayment,setVerifyingPayment] = useState(false);

  const[coursee,setCoursee] = useState(null);

  const reff = useRef([]);

  const[divIndex,setDivIndex] = useState(null);

  const dateformatter = (date) => {
    
        const newdate = new Date(date);
    
        const options = {
    
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC"
    
        }
    
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(newdate);
    
        const parts = formattedDate.split(", ");
    
        const result = `${parts[0]}, ${parts[1]}`;
    
        return result
    
  }

  const getdetailsofcourse = async(courseid) => {
 
     const toastid = toast.loading("Fetching...");
 
     setLoading(true);
 
     try{
 
         const res = await apiconnector("POST",courseurl.getdetailsofparticularcourse,{courseid:courseid});
 
         if (!res?.data?.success) {
 
             throw new Error(res?.data?.message || "Unknown error");
 
         }
 
 //         {
 //     "_id": "68cd599245149e4baf21134f",
 //     "coursename": "Complete JavaScript Mastery",
 //     "coursedescription": "Master JavaScript from basics to advanced concepts including ES6+, async programming, and modern frameworks.",
 //     "whatyouwilllearn": "Everything about JavaScript",
 //     "teacher": {
 //         "_id": "68bc7758556efb471b8ce19b",
 //         "firstname": "Rubel",
 //         "lastname": "Maratha",
 //         "email": "rubelmaratha910@gmail.com",
 //         "password": "$2b$10$OeY6Zoz286siHaMye9Kbruz8bIHtx8uUIyE9wySAhKm5713HeOtsG",
 //         "accounttype": "Instructor",
 //         "additionaldetails": {
 //             "_id": "68bc7758556efb471b8ce199",
 //             "gender": null,
 //             "dateofbirth": null,
 //             "about": null,
 //             "contactnumber": null,
 //             "__v": 0
 //         },
 //         "courses": [
 //             "68cd592145149e4baf211335",
 //             "68cd599245149e4baf21134f"
 //         ],
 //         "image": "https://api.dicebear.com/5.x/initials/svg?seed=RubelMaratha&backgroundColor=714ada",
 //         "courseprogress": [],
 //         "joined": "2025-09-06T17:36:05.205Z",
 //         "totallogins": 59,
 //         "__v": 0
 //     },
 //     "coursecontent": [
 //         {
 //             "_id": "68cd599745149e4baf211354",
 //             "sectionname": "Section 1",
 //             "subsection": [
 //                 {
 //                     "_id": "68cd59a945149e4baf21135a",
 //                     "title": "S1 T1",
 //                     "timeduration": "14.202667",
 //                     "description": "S1 D1",
 //                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1758288278/Learnova/hubv6lizl7c7s1qwxgab.mp4",
 //                     "sectiontowhichitbelong": "68cd599745149e4baf211354",
 //                     "__v": 0
 //                 }
 //             ],
 //             "__v": 0
 //         }
 //     ],
 //     "ratingandreviews": [],
 //     "price": 345,
 //     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1758288255/Learnova/novdogabxoqs3axdfmif.jpg",
 //     "createdat": "2025-09-19T13:24:34.274Z",
 //     "category": "67bc8af73ba49102ce51f78c",
 //     "studentenrolled": [],
 //     "__v": 0,
 //     "status": "Private"
 // }
 
        //  let sum = 0;
         
        //  let totaldur = 0;
         
        //  for(let i=0;i<res.data.data.coursecontent.length;i++){
         
        //      sum = sum + res.data.data.coursecontent[i].subsection.length;
         
        //      for(let j=0;j<res.data.data.coursecontent[i].subsection.length;j++){
         
        //          totaldur += parseInt(res.data.data.coursecontent[i].subsection[j].timeduration);
         
        //      }
         
        //  }
 
        //  dispatch(setImagee(res.data.data.thumbnail));
 
        //  dispatch(setTitle(res.data.data.coursename));
 
        //  dispatch(setDescription(res.data.data.coursedescription));
 
        //  dispatch(setNumberOfSections(res.data.data.coursecontent.length));
 
        //  dispatch(setEstimatedDuration(sectomin(totaldur)));
         
        //  dispatch(setNumberOfLectures(sum));
 
        //  dispatch(setEditCourse(true));
 
        //  dispatch(setCourse(res.data.data));
 
        setCoursee(res.data.data); 

     } catch(err){
 
         console.log("Error in fetching course : ",err);
     
         toast.error(err?.response?.data?.message || err.message);
 
     } finally{
 
       toast.dismiss(toastid);
 
       setLoading(false);
 
     }
 
 
   }

   const handlepaymentclick = () => {

      initiatepayment([coursee._id]);

   }

   const loadscriptfunction = (scriptt) => {

      return new Promise((resolve,reject)=>{

        const script = document.createElement("script");

        script.src = scriptt;

        script.onload = () => {

          resolve(true);

        }

        script.onerror = () => {

          resolve(false);

        }
        
        document.body.appendChild(script);

      })

   }

   const initiatepayment = async(courses) => {

      const toastid = toast.loading("Initiating Payment...");

      setInitiatePaymentLoading(true);

      try{

        const res = await loadscriptfunction("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){

            toast.error("Razorpay Script not loaded");

            return;

        }

        const orderres = await apiconnector("POST",paymenturl.createorder,{courses},{

            "Authorization": `Bearer ${token}`

        })

        if (!orderres?.data?.success) {

          throw new Error(orderres?.data?.message || "Unknown error");

        }

        const options = {

          key:import.meta.env.VITE_keyid,
          currency:orderres.data.data.currency,
          amount:orderres.data.data.amount,
          order_id:orderres.data.data.id,
          name:"Learnova",
          description:"Welcome to Learnova",
          image:learnova,
          prefill:{

            name:`${userdata.userinfo.firstname} ${userdata.userinfo.lastname}`,
            email:`${userdata.userinfo.email}`

          },
          handler:function(resp){

            sendpaymentsuccessfullmailfunction(resp,orderres.data.data.amount);

            verifypaymentfunction({...resp,courses});

          }

        }

        const paymentobj = new window.Razorpay(options);

        paymentobj.open();

        paymentobj.on("payment.failed",function(resp){

          toast.error("Payment Failed");
          console.log(resp);

        })

      } catch(err){

        console.log("Error in payment : ",err);

        toast.error(err?.response?.data?.message || err.message);

      } finally{

        toast.dismiss(toastid);

        setInitiatePaymentLoading(false);

      }
   }

   const sendpaymentsuccessfullmailfunction = async(resp,amount) => {

      try{

        await apiconnector("POST",paymenturl.sendpaymentsuccessfullemail,{orderid:resp.razorpay_order_id,paymentid:resp.razorpay_payment_id,amount:amount},{

            "Authorization": `Bearer ${token}`

        })

        toast.success("Payment Successfull Mail Sent");

      } catch(err){

        console.log("Error in sending mail : ",err);

      }

   }

   const verifypaymentfunction = async(body) => {

      const toastid = toast.loading("Verifying Payment...");

      setVerifyingPayment(true);

      try{

        const res = await apiconnector("POST",paymenturl.verifypayment,{body},{

            "Authorization": `Bearer ${token}`

        })

        if (!res?.data?.success) {

          throw new Error(res?.data?.message || "Unknown error");

        }

        toast.success("Payment Successfull");

        navi("/dashboard/learnings");

      } catch(err){

          console.log("Error in verifying payment : ",err);
          
          toast.error(err?.response?.data?.message || err.message);

      } finally{

          toast.dismiss(toastid);

          setVerifyingPayment(false);

      }

   }
 
   const handlesharecourse = () => {

      const courselink = `${window.location.origin}/course/${coursee._id}`;

      if(navigator.share){

         navigator.share({

            title:`${coursee?.coursename}`,
            text: `Check out this course on Learnova: ${coursee?.coursename}`,
            url: courselink,

         }).then(() => console.log("Course shared successfully")).catch((error) => console.log("Error in sharing course : ",error));

      } else{

          navigator.clipboard.writeText(courselink);
          toast.success("Course link copied to clipboard!");

      }

   }

   const calnooflectures = (course) => {

      let sum = 0;

      for(let i=0;i<course.coursecontent.length;i++){

          sum = sum + course.coursecontent[i].subsection.length;

      }

      return sum;

   }

   const calsectiondur = (section) => {

      let totaldur = 0;

      section.subsection.forEach(subsection => {

          totaldur += parseInt(subsection.timeduration);

      })

      return sectodur(totaldur);

   }

   const calnumofstudents = (coursesarray) => {

      let numofstudents = 0;

      coursesarray.forEach(course => {

        numofstudents += course.studentenrolled.length;

      })

      return numofstudents;

   }

   const calinstructorrating = (coursesarray) => {

      let totalratingarray = [];

      coursesarray.forEach(course => {

        let courserating = getaveragerating(course.ratingandreviews);

        totalratingarray.push(courserating);

      })

      const finalinstructorrating = Math.round((totalratingarray.reduce((acc,curr) => acc + curr,0)/totalratingarray.length)*10)/10;

      return finalinstructorrating

   }

   const handlefreeclick = async() => {

      const toastid = toast.loading("Enrolling...");

      setLoading(true);

      try{

        const res = await apiconnector("POST",paymenturl.freeenrollment,{courseid:coursee._id},{

            "Authorization": `Bearer ${token}`

        })

        if(!res?.data?.success) {

          throw new Error(res?.data?.message || "Unknown error");

        }

        toast.success("Enrollment Successfull");

        navi("/dashboard/learnings");

      } catch(err){

        console.log("Error in free enrollment : ",err);

        toast.error(err?.response?.data?.message || err.message);


      } finally{

        toast.dismiss(toastid);

        setLoading(false);

      }

   }

   useEffect(()=>{
 
     getdetailsofcourse(courseid);
 
   },[]);

 return (

    <div>

      {

        loading ? <div className="h-screen bg-[#0e121b] w-full flex flex-col justify-center items-center gap-5"><p className="text-[#dbdded] text-4xl font-nuninto tracking-wide">Loading...</p> <MoonLoader color="#5d6eee" size={170}></MoonLoader></div> : <> {

          initiatePaymentLoading ? <div className="h-screen bg-[#0e121b] w-full flex flex-col justify-center items-center gap-5"><p className="text-[#dbdded] text-[34px] sm:text-4xl font-nuninto tracking-wide">Initiating Payment...</p> <MoonLoader color="#5d6eee" size={170}></MoonLoader></div> : <> {

          verifyingPayment ? <div className="h-screen bg-[#0e121b] w-full flex flex-col justify-center items-center gap-5"><p className="text-[#dbdded] text-[34px] sm:text-4xl font-nuninto tracking-wide">Verifying Payment...</p> <MoonLoader color="#5d6eee" size={170}></MoonLoader></div> : <>

          <div className="bg-[#0e121b] text-white border-b border-[#232936]">

            <div className="w-[75%] lg:w-[52%] xl:w-[60%] pt-24 mx-auto sm:ml-[70px] flex flex-col gap-3.5 xl:gap-2 pb-60 lg:pb-7 items-center sm:items-start">

              <h1 className="text-[32px] font-nuninto text-center sm:text-left">{coursee?.coursename}</h1>

              <p className="text-[#94a3b8] font-lexend text-[17px] text-center sm:text-left">{coursee?.coursedescription}</p>

              <div className="flex items-center gap-2 sm:gap-9 text-[#dbdded] font-nuninto font-light flex-col sm:flex-row">

                <div className="flex items-center gap-2">

                  <ReactStars count={5} size={23} value={getaveragerating(coursee?.ratingandreviews)} color1={'gray'} color2={'#ffd700'} edit={false}/>

                  <span className="pt-[1px]">{getaveragerating(coursee?.ratingandreviews)}</span>

                  <span className="pt-[1px]">({coursee?.ratingandreviews?.length})</span>

                </div>

                <div className="flex items-center gap-1.5">

                  <GoPeople size={17}></GoPeople>

                  <span className="pt-[2px]">{coursee?.studentenrolled?.length} student</span>

                </div>

              </div>

              <div className="flex items-center gap-5 font-lexend font-light tracking-wide text-[#dbdded]">

                <div className="flex items-center gap-1.5">

                    <LuClock></LuClock>

                    <span>{coursee?.totalduration}</span>

                </div>

                <div className="flex items-center gap-1.5">

                    <MdLanguage></MdLanguage>

                    <span>{coursee?.courselanguage}</span>

                </div>

              </div>

              <div className="flex items-center sm:items-start xl:items-center gap-3 font-nuninto tracking-wide text-[#dbdded] flex-col xl:flex-row">

                  <p className="text-center sm:text-left">Created by <span className="text-[#7888f7]"> {coursee?.teacher?.firstname} {coursee?.teacher?.lastname} </span></p>

                  <span className="hidden xl:block">•</span>

                  <p className="text-center sm:text-left">Created at {dateformatter(coursee?.createdat)}</p>

              </div>

            </div>

          </div>

          <div className="relative">

              <div className={`rounded-xl bg-[#131722] w-[312px] max-w-[312px] sm:w-[362px] sm:max-w-[362px] h-max absolute ${coursee.studentenrolled.includes(userdata?.userinfo?._id) ? "-bottom-[174px]" : coursee.price != 0 ? "-bottom-[224px]" : "-bottom-[182px]"} translate-x-1/2 right-1/2 lg:translate-x-0 lg:right-8 xl:right-10 z-10`}>

                <div className="h-48 overflow-hidden rounded-t-lg">
                
                    <img src={coursee.thumbnail} loading="lazy" alt="XXX" className="w-full h-full object-cover"/>
                
                </div>

                <div className="text-white p-4 flex flex-col gap-3.5">
                    
                    <div className="text-[#16a249] font-lexend flex items-center">

                      <BiRupee size={25}></BiRupee>

                      <h1 className="text-[23px]">{coursee?.price} /-</h1>

                    </div>

                    {
                      !coursee.studentenrolled.includes(userdata?.userinfo?._id) ? coursee.price != 0 ? <button onClick={handlepaymentclick} className="bg-[#fbbd23] text-black rounded-lg font-nuninto tracking-wide py-1.5 text-base sm:text-lg font-medium transition-all duration-300 hover:-translate-y-[2px]">Buy now - Instant Access</button> : <button className="bg-[#fbbd23] text-black rounded-lg font-nuninto tracking-wide py-1.5 text-lg font-medium transition-all duration-300 hover:-translate-y-[2px]" onClick={handlefreeclick}>Enroll for free</button> : <button onClick={()=> navi("/dashboard/learnings")} className="bg-[#fbbd23] text-black rounded-lg font-nuninto tracking-wide py-1.5 text-lg font-medium transition-all duration-300 hover:-translate-y-[2px]">Go to Course</button>  
                    } 

                    { coursee.price != 0 && <>{

                      !coursee.studentenrolled.includes(userdata?.userinfo?._id) && <button onClick={()=>dispatch(addtocart(coursee))} className="bg-[#1d2839] rounded-lg font-nuninto tracking-wide py-1.5 font-medium transition-all duration-300 hover:scale-95">Add To Cart</button> 

                      }</>

                    }

                    <button onClick={handlesharecourse} className="flex tracking-wide items-center gap-1.5 font-rubik mx-auto mt-4">
                      
                      <IoShareSocial></IoShareSocial>

                      <span>Share this course</span>

                    </button>

                </div>

              </div>

          </div>

          <div className="bg-[#0b0d15] text-white">

              <div className="w-[90%] md:w-[75%] lg:w-[54%] xl:w-[60%] mx-auto md:ml-[70px] flex flex-col gap-7 pt-[18rem] lg:pt-10 pb-10">

                  <div className="border border-[#232936] px-5 py-[18px] sm:py-3.5 rounded-lg">

                      <h1 className="text-[22px] pb-3.5 font-nuninto tracking-wide text-center sm:text-left">What you will learn</h1>

                      <div className="grid md:grid-cols-2 gap-4 text-[#94a3b8]/90">

                          {
                             coursee?.whatyouwilllearn.split("\n").map((item,index)=>{

                                return <div key={index} className="flex items-start gap-2 group">

                                  <div className="pt-[4px] group-hover:scale-110 transition-all duration-300">

                                    <FiCheckCircle color="#16a249"></FiCheckCircle>

                                  </div>

                                  <span className="font-nuninto text-[17px] group-hover:text-[#94a3b8] transition-all duration-300">{item}</span>

                                </div>

                             })
                          }
                        
                      </div>

                  </div>

                  <div className="border border-[#232936] px-5 py-[17px] sm:py-3.5 rounded-lg">

                      <h1 className="text-[22px] pb-2 font-nuninto tracking-wide text-center sm:text-left">Course Content</h1>

                      <div className="flex items-center gap-2 sm:gap-3 font-nuninto text-[#94a3b8] text-[17px] tracking-wide mb-5 flex-col sm:flex-row">
                        
                        <p>{coursee.coursecontent.length} Section</p>

                        <span className="hidden sm:block">•</span>
                        
                        <p>{calnooflectures(coursee)} Lecture</p>

                        <span className="hidden sm:block">•</span>
                        
                        <p>{coursee?.totalduration} total length</p>

                      </div>

                      <div className="flex flex-col gap-2">

                          {
                            coursee.coursecontent.map((section,index)=>{

                              return <div key={index} className="border-b-[1px] border-[#232936]">
                                
                                <div className="flex items-center justify-between cursor-pointer my-3.5 flex-col sm:flex-row" onClick={()=>setDivIndex(divIndex === index ? null : index)}>

                                  <p className="text-[#dbdded] text-lg font-rubik tracking-wide">{section.sectionname}</p>

                                  <div className="flex items-center gap-2 sm:gap-3.5">

                                    <div className="flex items-center gap-1 sm:gap-2 text-[#94a3b8] font-rubik tracking-wide whitespace-nowrap shrink-0">

                                      <p>{section.subsection.length} lectures</p>

                                      <span>•</span>
                                      
                                      <p>{calsectiondur(section)}</p>

                                    </div>

                                    <div className={`${divIndex === index ? "rotate-180":"rotate-0"} text-[#dbdded] transition-all duration-300`}>

                                      <IoIosArrowDown></IoIosArrowDown>

                                    </div>

                                  </div>

                                </div>

                                <div ref={(el)=>reff.current[index] = el} className="overflow-hidden transition-all duration-300" style={{height:divIndex === index ? `${reff.current[index]?.scrollHeight}px`:"0px"}}>

                                  <div className={`flex flex-col gap-3.5 pb-3.5`}>

                                    {
                                      section.subsection.map((subsection,index) => {

                                          return <div key={index} className="flex items-center gap-2 w-[98%] mx-auto">

                                            <IoPlayOutline size={19} className="whitespace-nowrap shrink-0"></IoPlayOutline>

                                            <span className="font-rubik tracking-wide">{subsection?.title}</span>

                                          </div>

                                      })
                                    }

                                  </div>

                                </div>

                              </div>

                            })
                          }

                      </div>

                  </div>

                  <div className="border border-[#232936] px-5 py-4 sm:py-3.5 rounded-lg">

                      <h1 className="text-[22px] pb-3.5 font-nuninto tracking-wide text-center sm:text-left">Your instructor</h1>

                      <div className="flex items-center gap-3 flex-col sm:flex-row">

                        <img src={coursee.teacher.image} alt="XXX" className="w-[30%] sm:w-[13%] xl:w-[10%] rounded-full aspect-square object-cover"/>

                        <div className="flex flex-col gap-2 text-[#94a3b8] font-rubik">

                              <p className="text-xl text-[#7888f7] font-nuninto text-center sm:text-left">{coursee.teacher.firstname} {coursee.teacher.lastname}</p>

                              <div className="flex items-center gap-2 sm:gap-5 flex-col sm:flex-row">

                                  <div className="flex items-center gap-1.5">

                                    <GoPeople size={17}></GoPeople>

                                    <span>{calnumofstudents(coursee?.teacher?.courses)} students</span>

                                  </div>

                                  <div className="flex items-center gap-1.5">

                                    <FaRegStar></FaRegStar>

                                    <span>{coursee.instructorOverallRating} instructor rating</span>

                                  </div>

                              </div>

                          </div>

                      </div>

                  </div>

              </div>

          </div>

          <Footer></Footer>
          
          </>

          }

          </>

          }

        </>

      }

    </div>
 )   

}

// {
//     "_id": "68d90f1c1a97011b7d268054",
//     "coursename": "Spring Boot",
//     "coursedescription": "Learn about java spring boot in detail and make robust server side backend for scalable applications.",
//     "whatyouwilllearn": "Understanding auto-configuration and how Spring Boot simplifies project setup.\r\nHandling HTTP requests and responses.\r\nConnecting applications to relational databases (e.g., PostgreSQL, MySQL) using Spring Data JPA.\r\nImplementing authentication and authorization using Spring Security.\r\nWorking with JWT tokens or OAuth2 for secure applications.",
//     "courselanguage": "Spanish",
//     "teacher": {
//         "_id": "68bc7758556efb471b8ce19b",
//         "firstname": "Rubel",
//         "lastname": "Maratha",
//         "email": "rubelmaratha910@gmail.com",
//         "password": "$2b$10$OeY6Zoz286siHaMye9Kbruz8bIHtx8uUIyE9wySAhKm5713HeOtsG",
//         "accounttype": "Instructor",
//         "additionaldetails": "68bc7758556efb471b8ce199",
//         "courses": [
//             {
//                 "_id": "68d90d491a97011b7d268038",
//                 "coursename": "Standard Template Library (STL)",
//                 "coursedescription": "The Standard Template Library (STL) in C++ is a powerful collection of template classes and functions that provide efficient data structures and algorithms. It is a fundamental part of the C++ Standard Library and is widely used for developing robust and efficient applications.",
//                 "whatyouwilllearn": "You will learn about various data structures designed to store and manage data.\r\nYou will learn about objects that can be called like functions, often used with algorithms to customize behavior.",
//                 "courselanguage": "English",
//                 "teacher": "68bc7758556efb471b8ce19b",
//                 "coursecontent": [
//                     "68d90d501a97011b7d26803d"
//                 ],
//                 "ratingandreviews": [],
//                 "price": 1,
//                 "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759055152/Learnova/oxmlxbuoychleg8lcn4q.jpg",
//                 "createdat": "2025-09-28T10:26:17.011Z",
//                 "category": "67bc8a6d3ba49102ce51f784",
//                 "studentenrolled": [
//                     "68bc78bc556efb471b8ce1ac"
//                 ],
//                 "__v": 0,
//                 "status": "Published"
//             },
//             {
//                 "_id": "68d90f1c1a97011b7d268054",
//                 "coursename": "Spring Boot",
//                 "coursedescription": "Learn about java spring boot in detail and make robust server side backend for scalable applications.",
//                 "whatyouwilllearn": "Understanding auto-configuration and how Spring Boot simplifies project setup.\r\nHandling HTTP requests and responses.\r\nConnecting applications to relational databases (e.g., PostgreSQL, MySQL) using Spring Data JPA.\r\nImplementing authentication and authorization using Spring Security.\r\nWorking with JWT tokens or OAuth2 for secure applications.",
//                 "courselanguage": "Spanish",
//                 "teacher": "68bc7758556efb471b8ce19b",
//                 "coursecontent": [
//                     "68d90f211a97011b7d268059",
//                     "68d90f5e1a97011b7d268070"
//                 ],
//                 "ratingandreviews": [],
//                 "price": 1,
//                 "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759055620/Learnova/qdzq6wefg4bv5tidgt4g.jpg",
//                 "createdat": "2025-09-28T10:34:04.267Z",
//                 "category": "67bc8a863ba49102ce51f786",
//                 "studentenrolled": [
//                     "68d8f0005d51e74ea041f2e4"
//                 ],
//                 "__v": 0,
//                 "status": "Published"
//             },
//             {
//                 "_id": "68d9102b1a97011b7d268088",
//                 "coursename": "Flutter",
//                 "coursedescription": "Flutter transforms the entire app development process. Build, test, and deploy beautiful mobile, web, desktop, and embedded apps from a single codebase.",
//                 "whatyouwilllearn": "You'll start with Dart basics, including variables, data types, control flow, and object-oriented programming principles, as Dart is the language Flutter uses.\r\nUnderstand how to manage the internal state of widgets, which is crucial for creating dynamic user interfaces.\r\nExplore popular tools like Provider, Riverpod, or Bloc to manage application state more effectively as your apps grow.",
//                 "courselanguage": "Hinglish",
//                 "teacher": "68bc7758556efb471b8ce19b",
//                 "coursecontent": [
//                     "68d910301a97011b7d26808d"
//                 ],
//                 "ratingandreviews": [],
//                 "price": 2,
//                 "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759055891/Learnova/fkfwpchwoe5rj9z050js.png",
//                 "createdat": "2025-09-28T10:38:35.835Z",
//                 "category": "67bc8aa73ba49102ce51f788",
//                 "studentenrolled": [],
//                 "__v": 0,
//                 "status": "Published"
//             },
//             {
//                 "_id": "68d912b31a97011b7d2680cf",
//                 "coursename": "JavaScript",
//                 "coursedescription": "Learn about JavaScript in detail with real life examples, learn how JavaScript is used in various web applications.",
//                 "whatyouwilllearn": "Understanding different types of data like numbers, strings, booleans, arrays, and objects.\r\nAccessing HTML elements using methods like document.getElementById(), document.querySelector(), etc.",
//                 "courselanguage": "Hindi",
//                 "teacher": "68bc7758556efb471b8ce19b",
//                 "coursecontent": [
//                     "68d912b81a97011b7d2680d4"
//                 ],
//                 "ratingandreviews": [],
//                 "price": 1,
//                 "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759056539/Learnova/pabtqbrxfuboa1i0k9v9.png",
//                 "createdat": "2025-09-28T10:49:23.935Z",
//                 "category": "67bc8af73ba49102ce51f78c",
//                 "studentenrolled": [
//                     "68d8f0005d51e74ea041f2e4"
//                 ],
//                 "__v": 0,
//                 "status": "Published"
//             },
//             {
//                 "_id": "68d915a41a97011b7d2680eb",
//                 "coursename": "MongoDB",
//                 "coursedescription": "Learn about MongoDB database and how it is different from other relational databases.",
//                 "whatyouwilllearn": "How to retrieve data from database.\r\nLearn how to built schema.\r\nLearn CRUD operations. ",
//                 "courselanguage": "Hinglish",
//                 "teacher": "68bc7758556efb471b8ce19b",
//                 "coursecontent": [
//                     "68d915a91a97011b7d2680f0"
//                 ],
//                 "ratingandreviews": [],
//                 "price": 1,
//                 "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759057291/Learnova/tlynl74wlu0cujw8welr.png",
//                 "createdat": "2025-09-28T11:01:56.154Z",
//                 "category": "67bc8af73ba49102ce51f78c",
//                 "studentenrolled": [],
//                 "__v": 0,
//                 "status": "Private"
//             }
//         ],
//         "image": "https://api.dicebear.com/5.x/initials/svg?seed=RubelMaratha&backgroundColor=714ada",
//         "courseprogress": [],
//         "joined": "2025-09-06T17:36:05.205Z",
//         "totallogins": 85,
//         "__v": 0
//     },
//     "coursecontent": [
//         {
//             "_id": "68d90f211a97011b7d268059",
//             "sectionname": "Section 1",
//             "subsection": [
//                 {
//                     "_id": "68d90f331a97011b7d26805f",
//                     "title": "S1 T1",
//                     "timeduration": "5.525",
//                     "description": "S1 D1",
//                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1759055642/Learnova/jkfdcljkshwqclpvl4vs.mp4",
//                     "sectiontowhichitbelong": "68d90f211a97011b7d268059",
//                     "__v": 0
//                 },
//                 {
//                     "_id": "68d90f521a97011b7d268068",
//                     "title": "S1 T2",
//                     "timeduration": "75.84",
//                     "description": "S1 D2",
//                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1759055673/Learnova/hgvzc3gqwccueq5l2m3o.mp4",
//                     "sectiontowhichitbelong": "68d90f211a97011b7d268059",
//                     "__v": 0
//                 }
//             ],
//             "__v": 0
//         },
//         {
//             "_id": "68d90f5e1a97011b7d268070",
//             "sectionname": "Section 2",
//             "subsection": [
//                 {
//                     "_id": "68d90f751a97011b7d268077",
//                     "title": "S2 T1",
//                     "timeduration": "14.202667",
//                     "description": "S2 D1",
//                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1759055708/Learnova/cv8u2wcsvhrjhithuprb.mp4",
//                     "sectiontowhichitbelong": "68d90f5e1a97011b7d268070",
//                     "__v": 0
//                 }
//             ],
//             "__v": 0
//         }
//     ],
//     "ratingandreviews": [],
//     "price": 1,
//     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759055620/Learnova/qdzq6wefg4bv5tidgt4g.jpg",
//     "createdat": "2025-09-28T10:34:04.267Z",
//     "category": "67bc8a863ba49102ce51f786",
//     "studentenrolled": [
//         "68d8f0005d51e74ea041f2e4"
//     ],
//     "__v": 0,
//     "status": "Published",
//     "totalduration": "1mins 34secs"
// }