import { Sidebar } from '../Reusable/Sidebar'
import ReactStars from "react-stars";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { removefromcart, resetcart } from '../../redux/Cartslice';
import toast from 'react-hot-toast';
import { apiconnector } from '../../services/apiconnector';
import { paymenturl } from '../../services/apis';
import learnova from "../../assets/utilities image/learnova1.png";
import emptycart from "../../assets/utilities image/shopping (1).png"
import { useNavigate } from 'react-router-dom';
import { getaveragerating } from '../../utils/averagerating';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';

const MyBasket = () => {

  const {items,totalitems,totalamount} = useSelector(state => state.Cart);

  const token = useSelector(state => state.Auth.token);

  const navi = useNavigate();

  const userdata = useSelector((state)=> state.User.user);
 
  const dispatch = useDispatch();

  const[initiatePaymentLoading,setInitiatePaymentLoading] = useState(false);
  
  const[verifyingPayment,setVerifyingPayment] = useState(false);

  const Subtotal = totalamount;
  const Discount = Math.round(15*Subtotal/100);
  const Total = Subtotal - Discount;

    const handlepaymentclick = () => {

      const ids = items.map((item) => item._id);  

    //   console.log([ids]); 

      initiatepayment(ids);

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

        const orderres = await apiconnector("POST",paymenturl.createorder,{courses,Total},{

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

        dispatch(resetcart());

        navi("/dashboard/learnings");

      } catch(err){

          console.log("Error in verifying payment : ",err);
          
          toast.error(err?.response?.data?.message || err.message);

      } finally{

          toast.dismiss(toastid);

          setVerifyingPayment(false);

      }

   }

   const calnooflectures = (course) => {

      let sum = 0;

      for(let i=0;i<course.coursecontent.length;i++){

          sum = sum + course.coursecontent[i].subsection.length;

      }

      return sum;

   }

  return (

    <div className='flex flex-col-reverse md:flex-row bg-[#181825] h-screen overflow-hidden'>
        
        <Sidebar></Sidebar>

        {
          initiatePaymentLoading ? <div className="h-screen bg-[#181825] w-full md:w-[69%] lg:w-[76%] xl:w-[81%] flex flex-col justify-center items-center gap-10"><p className="text-[#dbdded] text-[28px] sm:text-4xl font-nuninto tracking-wide text-center">Initiating Payment...</p> <MoonLoader color="#5d6eee" size={150}></MoonLoader></div> : <>
                 
          {

          verifyingPayment ? <div className="h-screen bg-[#181825] w-full md:w-[69%] lg:w-[76%] xl:w-[81%] flex flex-col justify-center items-center gap-5"><p className="text-[#dbdded] text-[28px] sm:text-4xl font-nuninto tracking-wide">Verifying Payment...</p> <MoonLoader color="#5d6eee" size={150}></MoonLoader></div> :

          <div className='pt-[90px] px-4 sm:px-[26px] w-full md:w-[69%] lg:w-[76%] xl:w-[81%] overflow-y-scroll no-scrollbar'>

            <h3 className='text-[#dbdded] font-lexend text-2xl sm:text-[26px] mb-[5px] text-center sm:text-left'>My Basket</h3>
            
            <p className='text-[#79808a] text-center sm:text-left'>{totalitems} course ready for checkout</p>

            {

                totalitems === 0 ? <div className='h-[74vh] flex justify-center items-center flex-col gap-5 sm:gap-2 mt-9'><p className='text-[#dbdded] font-nuninto text-[25px] sm:text-3xl tracking-wider text-center'>You Cart is getting lonely!</p><img className='w-[80%] sm:w-[50%] lg:w-[35%]' src={emptycart} alt="XXX"/></div> : 

                <div className='text-white flex flex-col xl:flex-row gap-3 items-start my-5'>

                    <div className='bg-[#020813] w-full xl:w-[70%] border border-[#232936] rounded-xl'>

                        {
                            items?.map((item,index)=>{

                                return <div key={index} className='flex flex-col lg:flex-row mx-5 sm:mx-6 mt-7 mb-5 gap-[30px] border-b-[1px] border-gray-600 pb-7'>

                                    <div className='lg:w-[35%] h-max sm:h-[190px] lg:h-[145px] self-center'>

                                      <img src={item?.thumbnail} alt="XXX" className='h-full w-full object-contain' />
                                      
                                    </div>

                                    <div className='flex flex-col gap-4 flex-1'>

                                      <div className='flex items-center justify-center md:justify-between'>

                                        <h3 className='font-nuninto tracking-wide text-[22px]'>{item?.coursename}</h3>

                                        <button className="rounded-lg hover:scale-110 transition-all duration-300 hidden md:block" onClick={()=> dispatch(removefromcart(item))}>

                                            <RiDeleteBin6Line color="#d2514b" size={18}></RiDeleteBin6Line>

                                        </button>

                                      </div>

                                      <p className='font-lexend text-[#dbdded] text-center md:text-left'>By <span className='text-[#fbbd23]'>{item?.teacher.firstname} {item?.teacher.lastname}</span></p>

                                      <div className='flex items-center justify-center md:justify-start gap-2 font-lexend text-[#94a3b8] flex-wrap mb-2 sm:mb-0'>

                                        <span className='text-lg pt-[3px]'>{getaveragerating(item?.ratingandreviews)}</span>

                                        <ReactStars count={5} size={24} value={getaveragerating(item?.ratingandreviews)} color1={'gray'} color2={'#ffd700'} edit={false}/>

                                        <span>({item?.ratingandreviews?.length} reviews)</span>

                                      </div>

                                      <div className='flex items-center justify-center md:justify-between'>

                                        <div className='flex gap-2 font-nuninto text-[#dbdded] tracking-wide text-sm flex-wrap justify-center'>

                                          <span className='bg-gray-800 rounded-full px-3 pt-[2px] pb-[3px]'>{item?.coursecontent?.length} Sections</span>
                                          <span className='hidden sm:block'>•</span>
                                          <span className='bg-gray-800 rounded-full px-3 pt-[2px] pb-[3px]'>{calnooflectures(item)} Lectures</span>
                                          <span className='hidden sm:block'>•</span>
                                          <span className='bg-gray-800 rounded-full px-3 pt-[2px] pb-[3px]'>Beginner</span>

                                        </div>

                                        <div className='hidden md:flex items-center gap-1 text-[#fbbd23] font-rubik text-[19px]'>
                                            
                                            {item?.price}

                                            <span>Rs</span>

                                        </div>

                                      </div>

                                    </div>

                                    <div className='flex items-center justify-between sm:justify-around md:hidden'>

                                        <button className="rounded-lg hover:scale-110 transition-all duration-300" onClick={()=> dispatch(removefromcart(item))}>

                                            <RiDeleteBin6Line color="#d2514b" size={18}></RiDeleteBin6Line>

                                        </button>

                                        <div className='flex items-center gap-1 text-[#fbbd23] font-rubik text-[19px]'>
                                            
                                            {item?.price}

                                            <span>Rs</span>

                                        </div>

                                      </div>

                                </div>

                            })
                        }

                    </div>

                    <div className='bg-[#020813] w-[100%] sm:w-[65%] lg:w-[43%] xl:w-[30%] self-center lg:self-end xl:self-start px-3.5 sm:px-4 py-5 flex flex-col gap-3.5 sticky top-3 border border-[#232936] rounded-xl'>

                        <h3 className='text-lg sm:text-[22px] font-lexend tracking-wide'>Order Summary</h3>

                        <div className='flex justify-between text-base sm:text-lg font-nuninto tracking-wide text-[#94a3b8]'>

                            <span>Subtotal ({totalitems} item)</span>

                            <div className='flex items-center text-white'>

                                <BiRupee></BiRupee>

                                <span>{Subtotal}</span>

                            </div>

                        </div>

                        <div className='flex justify-between text-base sm:text-lg font-nuninto text-green-600'>

                            <span>Discount</span>

                            <div className='flex items-center'>

                                -<BiRupee></BiRupee>

                                <span>{Discount}</span>

                            </div>

                        </div>

                        <div className='bg-slate-400 h-[1px]'></div>

                        <div className='flex justify-between text-base sm:text-lg font-nuninto font-medium tracking-wide mt-2 items-center'>

                            <span className=''>Total (Round Off)</span>

                            <div className='flex items-center text-[#fbbd23]'>

                                <BiRupee></BiRupee>

                                <span>{Total}</span>

                            </div>

                        </div>

                        <div className='flex items-center gap-1.5 bg-green-700/20 border border-green-900 mx-auto pl-3 pr-3.5 pt-1.5 pb-2 rounded-lg font-rubik tracking-wide text-green-500 my-1.5 text-[15px] sm:text-base'>
                            
                            <span>🎉 You save</span> 
                            
                            <span className='flex items-center'>

                                <BiRupee></BiRupee>
                                
                                {Discount}

                            </span>

                        </div>

                        <button className='bg-green-800 px-2 py-1 font-rubik bg-[linear-gradient(135deg,#558bf7,#85acf9)] text-black text-base sm:text-lg rounded-lg tracking-wide' onClick={handlepaymentclick}>

                            Proceed to checkout

                        </button>

                    </div>

                </div>

            }

          </div>

          }

          </>
        }
    </div>

  )

}

export default MyBasket

// [
//     {
//         "_id": "68d8fe8f5d51e74ea041f363",
//         "coursename": "Kotlin",
//         "coursedescription": "Learn about kotlin language make apps that help people in real life.",
//         "whatyouwilllearn": "Building Android applications using Kotlin, including UI design with XML or Jetpack Compose, handling user input, working with data, and navigating between screens.\r\nUsing frameworks like Ktor or Spring Boot with Kotlin for server-side applications.\r\nMultiplatform Development: Exploring Kotlin Multiplatform Mobile (KMM) for sharing code between Android and iOS.",
//         "courselanguage": "Hinglish",
//         "teacher": {
//             "_id": "68d8ef245d51e74ea041f2da",
//             "firstname": "Rahul",
//             "lastname": "Sharma",
//             "email": "medegi2451@mv6a.com",
//             "password": "$2b$10$lWbdB5eW2BDdrkGnAHKWweWQ.jcQAIsqE6ecT7DMUhUGKYUEULaTq",
//             "accounttype": "Instructor",
//             "additionaldetails": "68d8ef245d51e74ea041f2d8",
//             "courses": [
//                 {
//                     "_id": "68d8f4495d51e74ea041f2ef",
//                     "coursename": "C++",
//                     "coursedescription": "Learn about C Plus Plus and make industry level projects.",
//                     "whatyouwilllearn": "Understanding the basic rules of writing C++ code, including keywords, identifiers, and program structure.",
//                     "courselanguage": "English",
//                     "teacher": "68d8ef245d51e74ea041f2da",
//                     "coursecontent": [
//                         "68d8f4535d51e74ea041f2f4"
//                     ],
//                     "ratingandreviews": [],
//                     "price": 1,
//                     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759051146/Learnova/iyjear5acols8cwgxci5.jpg",
//                     "createdat": "2025-09-28T08:39:37.440Z",
//                     "category": "67bc8a6d3ba49102ce51f784",
//                     "studentenrolled": [],
//                     "__v": 0,
//                     "status": "Published"
//                 },
//                 {
//                     "_id": "68d8fc965d51e74ea041f325",
//                     "coursename": "Java",
//                     "coursedescription": "Learn about java programming and crack product based companies with high packages.",
//                     "whatyouwilllearn": "Object-Oriented Programming (OOP) language.\r\nLearn basic syntax, data types, variables, control flow, and methods.\r\nAdvanced topics include exception handling, multithreading, file I/O, and Java Collections, enabling you to develop a wide range of applications.",
//                     "courselanguage": "Spanish",
//                     "teacher": "68d8ef245d51e74ea041f2da",
//                     "coursecontent": [
//                         "68d8fc9d5d51e74ea041f32a",
//                         "68d8fcdb5d51e74ea041f338"
//                     ],
//                     "ratingandreviews": [],
//                     "price": 2,
//                     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759050878/Learnova/bnxytfus1dhheevvdklm.jpg",
//                     "createdat": "2025-09-28T09:15:02.472Z",
//                     "category": "67bc8a863ba49102ce51f786",
//                     "studentenrolled": [],
//                     "__v": 0,
//                     "status": "Published"
//                 },
//                 {
//                     "_id": "68d8fe8f5d51e74ea041f363",
//                     "coursename": "Kotlin",
//                     "coursedescription": "Learn about kotlin language make apps that help people in real life.",
//                     "whatyouwilllearn": "Building Android applications using Kotlin, including UI design with XML or Jetpack Compose, handling user input, working with data, and navigating between screens.\r\nUsing frameworks like Ktor or Spring Boot with Kotlin for server-side applications.\r\nMultiplatform Development: Exploring Kotlin Multiplatform Mobile (KMM) for sharing code between Android and iOS.",
//                     "courselanguage": "Hinglish",
//                     "teacher": "68d8ef245d51e74ea041f2da",
//                     "coursecontent": [
//                         "68d8fe955d51e74ea041f368"
//                     ],
//                     "ratingandreviews": [],
//                     "price": 1,
//                     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759051383/Learnova/cm5nmor3i77f7paymame.jpg",
//                     "createdat": "2025-09-28T09:23:27.311Z",
//                     "category": "67bc8aa73ba49102ce51f788",
//                     "studentenrolled": [
//                         "68bc78bc556efb471b8ce1ac"
//                     ],
//                     "__v": 0,
//                     "status": "Published"
//                 },
//                 {
//                     "_id": "68d902435d51e74ea041f3a6",
//                     "coursename": "React JS",
//                     "coursedescription": "Learn about react and its uses in making web application. Learn about jsx and hooks in detail.",
//                     "whatyouwilllearn": "Learn about different types of hooks.\r\nAbout how to manage state if the project is large in size.",
//                     "courselanguage": "Hindi",
//                     "teacher": "68d8ef245d51e74ea041f2da",
//                     "coursecontent": [
//                         "68d902495d51e74ea041f3ab",
//                         "68d902685d51e74ea041f3b9"
//                     ],
//                     "ratingandreviews": [],
//                     "price": 2,
//                     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759052331/Learnova/rlwpbdrypvbcqbl5k3xk.png",
//                     "createdat": "2025-09-28T09:39:15.443Z",
//                     "category": "67bc8af73ba49102ce51f78c",
//                     "studentenrolled": [],
//                     "__v": 0,
//                     "status": "Published"
//                 }
//             ],
//             "image": "https://api.dicebear.com/5.x/initials/svg?seed=RahulSharma&backgroundColor=714ada",
//             "courseprogress": [],
//             "joined": "2025-09-28T06:56:12.432Z",
//             "totallogins": 4,
//             "__v": 0
//         },
//         "coursecontent": [
//             {
//                 "_id": "68d8fe955d51e74ea041f368",
//                 "sectionname": "Section 1",
//                 "subsection": [
//                     {
//                         "_id": "68d8ff995d51e74ea041f370",
//                         "title": "S1 T1",
//                         "timeduration": "5.525",
//                         "description": "S1 D1",
//                         "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1759051648/Learnova/aqmjbpkytaxmnkpscijj.mp4",
//                         "sectiontowhichitbelong": "68d8fe955d51e74ea041f368",
//                         "__v": 0
//                     }
//                 ],
//                 "__v": 0
//             }
//         ],
//         "ratingandreviews": [],
//         "price": 1,
//         "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759051383/Learnova/cm5nmor3i77f7paymame.jpg",
//         "createdat": "2025-09-28T09:23:27.311Z",
//         "category": "67bc8aa73ba49102ce51f788",
//         "studentenrolled": [
//             "68bc78bc556efb471b8ce1ac"
//         ],
//         "__v": 0,
//         "status": "Published",
//         "totalduration": "5secs"
//     },
//     {
//         "_id": "68d902435d51e74ea041f3a6",
//         "coursename": "React JS",
//         "coursedescription": "Learn about react and its uses in making web application. Learn about jsx and hooks in detail.",
//         "whatyouwilllearn": "Learn about different types of hooks.\r\nAbout how to manage state if the project is large in size.",
//         "courselanguage": "Hindi",
//         "teacher": {
//             "_id": "68d8ef245d51e74ea041f2da",
//             "firstname": "Rahul",
//             "lastname": "Sharma",
//             "email": "medegi2451@mv6a.com",
//             "password": "$2b$10$lWbdB5eW2BDdrkGnAHKWweWQ.jcQAIsqE6ecT7DMUhUGKYUEULaTq",
//             "accounttype": "Instructor",
//             "additionaldetails": "68d8ef245d51e74ea041f2d8",
//             "courses": [
//                 {
//                     "_id": "68d8f4495d51e74ea041f2ef",
//                     "coursename": "C++",
//                     "coursedescription": "Learn about C Plus Plus and make industry level projects.",
//                     "whatyouwilllearn": "Understanding the basic rules of writing C++ code, including keywords, identifiers, and program structure.",
//                     "courselanguage": "English",
//                     "teacher": "68d8ef245d51e74ea041f2da",
//                     "coursecontent": [
//                         "68d8f4535d51e74ea041f2f4"
//                     ],
//                     "ratingandreviews": [],
//                     "price": 1,
//                     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759051146/Learnova/iyjear5acols8cwgxci5.jpg",
//                     "createdat": "2025-09-28T08:39:37.440Z",
//                     "category": "67bc8a6d3ba49102ce51f784",
//                     "studentenrolled": [],
//                     "__v": 0,
//                     "status": "Published"
//                 },
//                 {
//                     "_id": "68d8fc965d51e74ea041f325",
//                     "coursename": "Java",
//                     "coursedescription": "Learn about java programming and crack product based companies with high packages.",
//                     "whatyouwilllearn": "Object-Oriented Programming (OOP) language.\r\nLearn basic syntax, data types, variables, control flow, and methods.\r\nAdvanced topics include exception handling, multithreading, file I/O, and Java Collections, enabling you to develop a wide range of applications.",
//                     "courselanguage": "Spanish",
//                     "teacher": "68d8ef245d51e74ea041f2da",
//                     "coursecontent": [
//                         "68d8fc9d5d51e74ea041f32a",
//                         "68d8fcdb5d51e74ea041f338"
//                     ],
//                     "ratingandreviews": [],
//                     "price": 2,
//                     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759050878/Learnova/bnxytfus1dhheevvdklm.jpg",
//                     "createdat": "2025-09-28T09:15:02.472Z",
//                     "category": "67bc8a863ba49102ce51f786",
//                     "studentenrolled": [],
//                     "__v": 0,
//                     "status": "Published"
//                 },
//                 {
//                     "_id": "68d8fe8f5d51e74ea041f363",
//                     "coursename": "Kotlin",
//                     "coursedescription": "Learn about kotlin language make apps that help people in real life.",
//                     "whatyouwilllearn": "Building Android applications using Kotlin, including UI design with XML or Jetpack Compose, handling user input, working with data, and navigating between screens.\r\nUsing frameworks like Ktor or Spring Boot with Kotlin for server-side applications.\r\nMultiplatform Development: Exploring Kotlin Multiplatform Mobile (KMM) for sharing code between Android and iOS.",
//                     "courselanguage": "Hinglish",
//                     "teacher": "68d8ef245d51e74ea041f2da",
//                     "coursecontent": [
//                         "68d8fe955d51e74ea041f368"
//                     ],
//                     "ratingandreviews": [],
//                     "price": 1,
//                     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759051383/Learnova/cm5nmor3i77f7paymame.jpg",
//                     "createdat": "2025-09-28T09:23:27.311Z",
//                     "category": "67bc8aa73ba49102ce51f788",
//                     "studentenrolled": [
//                         "68bc78bc556efb471b8ce1ac"
//                     ],
//                     "__v": 0,
//                     "status": "Published"
//                 },
//                 {
//                     "_id": "68d902435d51e74ea041f3a6",
//                     "coursename": "React JS",
//                     "coursedescription": "Learn about react and its uses in making web application. Learn about jsx and hooks in detail.",
//                     "whatyouwilllearn": "Learn about different types of hooks.\r\nAbout how to manage state if the project is large in size.",
//                     "courselanguage": "Hindi",
//                     "teacher": "68d8ef245d51e74ea041f2da",
//                     "coursecontent": [
//                         "68d902495d51e74ea041f3ab",
//                         "68d902685d51e74ea041f3b9"
//                     ],
//                     "ratingandreviews": [],
//                     "price": 2,
//                     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759052331/Learnova/rlwpbdrypvbcqbl5k3xk.png",
//                     "createdat": "2025-09-28T09:39:15.443Z",
//                     "category": "67bc8af73ba49102ce51f78c",
//                     "studentenrolled": [],
//                     "__v": 0,
//                     "status": "Published"
//                 }
//             ],
//             "image": "https://api.dicebear.com/5.x/initials/svg?seed=RahulSharma&backgroundColor=714ada",
//             "courseprogress": [],
//             "joined": "2025-09-28T06:56:12.432Z",
//             "totallogins": 4,
//             "__v": 0
//         },
//         "coursecontent": [
//             {
//                 "_id": "68d902495d51e74ea041f3ab",
//                 "sectionname": "Section 1",
//                 "subsection": [
//                     {
//                         "_id": "68d9025c5d51e74ea041f3b1",
//                         "title": "S1 T1",
//                         "timeduration": "14.202667",
//                         "description": "S1 D1",
//                         "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1759052355/Learnova/iy8pjmfddtue0fpn6u4y.mp4",
//                         "sectiontowhichitbelong": "68d902495d51e74ea041f3ab",
//                         "__v": 0
//                     }
//                 ],
//                 "__v": 0
//             },
//             {
//                 "_id": "68d902685d51e74ea041f3b9",
//                 "sectionname": "Section 2",
//                 "subsection": [
//                     {
//                         "_id": "68d9027b5d51e74ea041f3c0",
//                         "title": "S2 T1",
//                         "timeduration": "5.525",
//                         "description": "S2 D1",
//                         "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1759052387/Learnova/ucorn4fipxyugkys8wco.mp4",
//                         "sectiontowhichitbelong": "68d902685d51e74ea041f3b9",
//                         "__v": 0
//                     },
//                     {
//                         "_id": "68d902d85d51e74ea041f3c9",
//                         "title": "S2 T2",
//                         "timeduration": "75.84",
//                         "description": "S2 D2",
//                         "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1759052479/Learnova/bl0vmrnmvvonzs9ybeom.mp4",
//                         "sectiontowhichitbelong": "68d902685d51e74ea041f3b9",
//                         "__v": 0
//                     }
//                 ],
//                 "__v": 0
//             }
//         ],
//         "ratingandreviews": [],
//         "price": 2,
//         "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759052331/Learnova/rlwpbdrypvbcqbl5k3xk.png",
//         "createdat": "2025-09-28T09:39:15.443Z",
//         "category": "67bc8af73ba49102ce51f78c",
//         "studentenrolled": [],
//         "__v": 0,
//         "status": "Published",
//         "totalduration": "1mins 34secs"
//     },
//     {
//         "_id": "68d8f4495d51e74ea041f2ef",
//         "coursename": "C++",
//         "coursedescription": "Learn about C Plus Plus and make industry level projects.",
//         "whatyouwilllearn": "Understanding the basic rules of writing C++ code, including keywords, identifiers, and program structure.",
//         "courselanguage": "English",
//         "teacher": {
//             "_id": "68d8ef245d51e74ea041f2da",
//             "firstname": "Rahul",
//             "lastname": "Sharma",
//             "email": "medegi2451@mv6a.com",
//             "password": "$2b$10$lWbdB5eW2BDdrkGnAHKWweWQ.jcQAIsqE6ecT7DMUhUGKYUEULaTq",
//             "accounttype": "Instructor",
//             "additionaldetails": "68d8ef245d51e74ea041f2d8",
//             "courses": [
//                 {
//                     "_id": "68d8f4495d51e74ea041f2ef",
//                     "coursename": "C++",
//                     "coursedescription": "Learn about C Plus Plus and make industry level projects.",
//                     "whatyouwilllearn": "Understanding the basic rules of writing C++ code, including keywords, identifiers, and program structure.",
//                     "courselanguage": "English",
//                     "teacher": "68d8ef245d51e74ea041f2da",
//                     "coursecontent": [
//                         "68d8f4535d51e74ea041f2f4"
//                     ],
//                     "ratingandreviews": [],
//                     "price": 1,
//                     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759051146/Learnova/iyjear5acols8cwgxci5.jpg",
//                     "createdat": "2025-09-28T08:39:37.440Z",
//                     "category": "67bc8a6d3ba49102ce51f784",
//                     "studentenrolled": [],
//                     "__v": 0,
//                     "status": "Published"
//                 },
//                 {
//                     "_id": "68d8fc965d51e74ea041f325",
//                     "coursename": "Java",
//                     "coursedescription": "Learn about java programming and crack product based companies with high packages.",
//                     "whatyouwilllearn": "Object-Oriented Programming (OOP) language.\r\nLearn basic syntax, data types, variables, control flow, and methods.\r\nAdvanced topics include exception handling, multithreading, file I/O, and Java Collections, enabling you to develop a wide range of applications.",
//                     "courselanguage": "Spanish",
//                     "teacher": "68d8ef245d51e74ea041f2da",
//                     "coursecontent": [
//                         "68d8fc9d5d51e74ea041f32a",
//                         "68d8fcdb5d51e74ea041f338"
//                     ],
//                     "ratingandreviews": [],
//                     "price": 2,
//                     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759050878/Learnova/bnxytfus1dhheevvdklm.jpg",
//                     "createdat": "2025-09-28T09:15:02.472Z",
//                     "category": "67bc8a863ba49102ce51f786",
//                     "studentenrolled": [],
//                     "__v": 0,
//                     "status": "Published"
//                 },
//                 {
//                     "_id": "68d8fe8f5d51e74ea041f363",
//                     "coursename": "Kotlin",
//                     "coursedescription": "Learn about kotlin language make apps that help people in real life.",
//                     "whatyouwilllearn": "Building Android applications using Kotlin, including UI design with XML or Jetpack Compose, handling user input, working with data, and navigating between screens.\r\nUsing frameworks like Ktor or Spring Boot with Kotlin for server-side applications.\r\nMultiplatform Development: Exploring Kotlin Multiplatform Mobile (KMM) for sharing code between Android and iOS.",
//                     "courselanguage": "Hinglish",
//                     "teacher": "68d8ef245d51e74ea041f2da",
//                     "coursecontent": [
//                         "68d8fe955d51e74ea041f368"
//                     ],
//                     "ratingandreviews": [],
//                     "price": 1,
//                     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759051383/Learnova/cm5nmor3i77f7paymame.jpg",
//                     "createdat": "2025-09-28T09:23:27.311Z",
//                     "category": "67bc8aa73ba49102ce51f788",
//                     "studentenrolled": [
//                         "68bc78bc556efb471b8ce1ac"
//                     ],
//                     "__v": 0,
//                     "status": "Published"
//                 },
//                 {
//                     "_id": "68d902435d51e74ea041f3a6",
//                     "coursename": "React JS",
//                     "coursedescription": "Learn about react and its uses in making web application. Learn about jsx and hooks in detail.",
//                     "whatyouwilllearn": "Learn about different types of hooks.\r\nAbout how to manage state if the project is large in size.",
//                     "courselanguage": "Hindi",
//                     "teacher": "68d8ef245d51e74ea041f2da",
//                     "coursecontent": [
//                         "68d902495d51e74ea041f3ab",
//                         "68d902685d51e74ea041f3b9"
//                     ],
//                     "ratingandreviews": [],
//                     "price": 2,
//                     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759052331/Learnova/rlwpbdrypvbcqbl5k3xk.png",
//                     "createdat": "2025-09-28T09:39:15.443Z",
//                     "category": "67bc8af73ba49102ce51f78c",
//                     "studentenrolled": [],
//                     "__v": 0,
//                     "status": "Published"
//                 }
//             ],
//             "image": "https://api.dicebear.com/5.x/initials/svg?seed=RahulSharma&backgroundColor=714ada",
//             "courseprogress": [],
//             "joined": "2025-09-28T06:56:12.432Z",
//             "totallogins": 4,
//             "__v": 0
//         },
//         "coursecontent": [
//             {
//                 "_id": "68d8f4535d51e74ea041f2f4",
//                 "sectionname": "Section 1",
//                 "subsection": [
//                     {
//                         "_id": "68d8f49c5d51e74ea041f2fa",
//                         "title": "S1 T1",
//                         "timeduration": "14.202667",
//                         "description": "S1 D1",
//                         "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1759048835/Learnova/qs5s75k1cbnhqxp0ecyg.mp4",
//                         "sectiontowhichitbelong": "68d8f4535d51e74ea041f2f4",
//                         "__v": 0
//                     }
//                 ],
//                 "__v": 0
//             }
//         ],
//         "ratingandreviews": [],
//         "price": 1,
//         "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1759051146/Learnova/iyjear5acols8cwgxci5.jpg",
//         "createdat": "2025-09-28T08:39:37.440Z",
//         "category": "67bc8a6d3ba49102ce51f784",
//         "studentenrolled": [],
//         "__v": 0,
//         "status": "Published",
//         "totalduration": "14secs"
//     }
// ]