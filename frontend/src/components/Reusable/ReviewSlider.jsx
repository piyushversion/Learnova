import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ReactStars from 'react-stars'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import { apiconnector } from '../../services/apiconnector';
import { ratingandreviewsurl } from '../../services/apis';
import { SyncLoader } from 'react-spinners';

const ReviewSlider = () => {

  const[ratingAndReviews,setRatingAndReviews] = useState([]);

  const[loading,setLoading] = useState(true);

  const fetchratingandreviews = async() => {

      try{

        const res = await apiconnector("GET",ratingandreviewsurl.getallrating);

        if (!res?.data?.success) {
 
            throw new Error(res?.data?.message || "Unknown error");
 
        }

        setRatingAndReviews(res.data.data);

      }catch(err){

        console.log("Error in fetching rating and reviews: ",err);
     
        toast.error(err?.response?.data?.message || err.message);

      } finally{

        setLoading(false);

      }

  }

  useEffect(()=>{

    fetchratingandreviews();

  },[])

  return (

    <>

        {
          loading ? <div className='bg-[#020813] flex flex-col justify-center items-center gap-10 py-10'><SyncLoader color='white' size={20}></SyncLoader> <span className='text-white text-3xl font-nuninto tracking-wide'>Fetching Reviews...</span></div> : <div className='text-white bg-[#020813] px-5 pb-10'> 

            <p className='text-[33px] text-center font-nuninto tracking-wide py-8 text-[#dbdded]'>Review from other learners</p>

            {
  
            ratingAndReviews.length === 0 ? <p className='text-[26px] sm:text-3xl text-center font-nuninto tracking-wide pt-6 pb-8 text-[#dbdded]'>No reviews available yet.</p> : <>


            <Swiper spaceBetween={30} slidesPerView={4} modules={[Autoplay]} autoplay={{ delay: 2000, disableOnInteraction: false }} breakpoints={{0: { slidesPerView: 1 },768: { slidesPerView: 2 },1024: { slidesPerView: 3 },}} loop={true}>

              {

                ratingAndReviews.map((item,index)=>{

                    return <SwiperSlide key={index}>

                        <div className='border border-[#212123] rounded-lg p-5 flex flex-col'>

                            <div className='flex gap-3 items-start'>

                              <img src={item.userwhohasgivenrar.image} alt={item.userwhohasgivenrar.firstname} className="w-[12%] rounded-full aspect-square border border-[#dbdded]/70"/>

                              <div>
                                
                                <p className="font-semibold font-nuninto tracking-wide text-lg">{item.userwhohasgivenrar.firstname} {item.userwhohasgivenrar.lastname}</p>

                                <p className='font-nuninto tracking-wide text-gray-400'>{item.courseonwhichrargiven.coursename}</p>

                              </div>

                            </div>

                            <p className='text-[#dbdded] font-nuninto tracking-wide pt-3.5 pb-1.5'>

                              {item.reviews.length > 180 ? item.reviews.substring(0, 180) + "..." : item.reviews}

                            </p>

                            <div className='flex items-center font-rubik gap-2'>

                              <p className='text-[19px] pt-[2px] text-[#ffd700]'>{item.rating}</p>
                              
                              <ReactStars size={25} count={5} edit={false} value={item.rating}></ReactStars>

                            </div>

                        </div>

                    </SwiperSlide>

                })

              }

            </Swiper>

            </>
          }
          
         </div>
        }
        
    </>

  )

}

export default ReviewSlider

{/* <Swiper spaceBetween={30} slidesPerView={4} modules={[Navigation]} navigation breakpoints={{0: { slidesPerView: 1,centeredSlides:false },768: { slidesPerView: 2,centeredSlides:true },1024: { slidesPerView: 3,centeredSlides:true },}} loop={true} centeredSlides={true}>

                  {
                    ratingAndReviews.map((item,index)=>(

                        <SwiperSlide key={index}>

                          {({isActive})=>(


                          <div className={`transition-transform duration-500 ease-out ${
                    isActive ? "scale-105 opacity-100" : "scale-95 opacity-70"
                  } rounded-xl p-6 shadow-md border border-gray-800 h-full flex flex-col justify-between`}>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.reviews.length > 180 ? item.reviews.substring(0, 180) + "..." : item.reviews}
              </p>
              <ReactStars size={25} count={5} edit={false} value={item.rating}></ReactStars>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={item.userwhohasgivenrar.image}
                  alt={item.userwhohasgivenrar.firstname}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{item.userwhohasgivenrar.firstname} {item.userwhohasgivenrar.lastname}</p>
                </div>
              </div>
            </div>

                          )}


                        </SwiperSlide>

                    ))
                  }

              </Swiper> */}


// [
//     {
//         "_id": "68e5005bd589bb0e2b98b392",
//         "userwhohasgivenrar": {
//             "_id": "68bc78bc556efb471b8ce1ac",
//             "firstname": "Piyush",
//             "lastname": "Dhote",
//             "image": "https://api.dicebear.com/5.x/initials/svg?seed=PiyushDhote&backgroundColor=714ada"
//         },
//         "rating": 5,
//         "reviews": "Very Good Course",
//         "courseonwhichrargiven": {
//             "_id": "68dba004ee1a02ee8a2c649b",
//             "coursename": "Python",
//             "coursedescription": "Learn python and its framework and how it is used in the various domain of programming."
//         },
//         "__v": 0
//     },
//     {
//         "_id": "68e40d4ac249b15a4da8f7c4",
//         "userwhohasgivenrar": {
//             "_id": "68d8f0005d51e74ea041f2e4",
//             "firstname": "Karan",
//             "lastname": "Aujla",
//             "image": "https://api.dicebear.com/5.x/initials/svg?seed=KaranAujla&backgroundColor=714ada"
//         },
//         "rating": 4,
//         "reviews": "Very Good",
//         "courseonwhichrargiven": {
//             "_id": "68d90f1c1a97011b7d268054",
//             "coursename": "Spring Boot",
//             "coursedescription": "Learn about java spring boot in detail and make robust server side backend for scalable applications."
//         },
//         "__v": 0
//     },
//     {
//         "_id": "68e40d6ec249b15a4da8f7e1",
//         "userwhohasgivenrar": {
//             "_id": "68d8f0005d51e74ea041f2e4",
//             "firstname": "Karan",
//             "lastname": "Aujla",
//             "image": "https://api.dicebear.com/5.x/initials/svg?seed=KaranAujla&backgroundColor=714ada"
//         },
//         "rating": 3.5,
//         "reviews": "kjk",
//         "courseonwhichrargiven": {
//             "_id": "68d912b31a97011b7d2680cf",
//             "coursename": "JavaScript",
//             "coursedescription": "Learn about JavaScript in detail with real life examples, learn how JavaScript is used in various web applications."
//         },
//         "__v": 0
//     },
//     {
//         "_id": "68e41347f02da239e1d0c107",
//         "userwhohasgivenrar": {
//             "_id": "68bc78bc556efb471b8ce1ac",
//             "firstname": "Piyush",
//             "lastname": "Dhote",
//             "image": "https://api.dicebear.com/5.x/initials/svg?seed=PiyushDhote&backgroundColor=714ada"
//         },
//         "rating": 3,
//         "reviews": "Best",
//         "courseonwhichrargiven": {
//             "_id": "68d90d491a97011b7d268038",
//             "coursename": "Standard Template Library (STL)",
//             "coursedescription": "The Standard Template Library (STL) in C++ is a powerful collection of template classes and functions that provide efficient data structures and algorithms. It is a fundamental part of the C++ Standard Library and is widely used for developing robust and efficient applications."
//         },
//         "__v": 0
//     },
//     {
//         "_id": "68e41379f02da239e1d0c132",
//         "userwhohasgivenrar": {
//             "_id": "68bc78bc556efb471b8ce1ac",
//             "firstname": "Piyush",
//             "lastname": "Dhote",
//             "image": "https://api.dicebear.com/5.x/initials/svg?seed=PiyushDhote&backgroundColor=714ada"
//         },
//         "rating": 3,
//         "reviews": "Holy",
//         "courseonwhichrargiven": {
//             "_id": "68d8fe8f5d51e74ea041f363",
//             "coursename": "Kotlin",
//             "coursedescription": "Learn about kotlin language make apps that help people in real life."
//         },
//         "__v": 0
//     },
//     {
//         "_id": "68e412a1f02da239e1d0c0a4",
//         "userwhohasgivenrar": {
//             "_id": "68d8f0005d51e74ea041f2e4",
//             "firstname": "Karan",
//             "lastname": "Aujla",
//             "image": "https://api.dicebear.com/5.x/initials/svg?seed=KaranAujla&backgroundColor=714ada"
//         },
//         "rating": 2.5,
//         "reviews": "Very Bad",
//         "courseonwhichrargiven": {
//             "_id": "68d902435d51e74ea041f3a6",
//             "coursename": "React JS",
//             "coursedescription": "Learn about react and its uses in making web application. Learn about jsx and hooks in detail."
//         },
//         "__v": 0
//     },
//     {
//         "_id": "68e41307f02da239e1d0c0da",
//         "userwhohasgivenrar": {
//             "_id": "68d8f0005d51e74ea041f2e4",
//             "firstname": "Karan",
//             "lastname": "Aujla",
//             "image": "https://api.dicebear.com/5.x/initials/svg?seed=KaranAujla&backgroundColor=714ada"
//         },
//         "rating": 0.5,
//         "reviews": "Average",
//         "courseonwhichrargiven": {
//             "_id": "68d8fc965d51e74ea041f325",
//             "coursename": "Java",
//             "coursedescription": "Learn about java programming and crack product based companies with high packages."
//         },
//         "__v": 0
//     }
// ]