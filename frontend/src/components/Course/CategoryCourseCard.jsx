import ReactStars from "react-stars";
import { LuClock } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { MdPeopleAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { sectodur } from "../../utils/duration";
import { getaveragerating } from "../../utils/averagerating";
import { useState } from "react";

export const CategoryCourseCard = ({course}) => {

  const navi = useNavigate();

  const[showFullString,setShowFullString] = useState(false);

  const caldur = (course) => {

      let dur = 0;

      for(let i=0;i<course.coursecontent.length;i++){

          for(let j=0;j<course.coursecontent[i].subsection.length;j++){

              dur += parseInt(course.coursecontent[i].subsection[j].timeduration);

          }

      }

      return sectodur(dur);

   }

  return (

    <div className="rounded-xl bg-[#020813] group w-[362px] max-w-[362px] md:w-[335px] md:max-w-[335px] lg:w-[362px] lg:max-w-[362px] h-max border border-[#303036]">

        <div className="h-48 overflow-hidden rounded-t-lg">
        
            <img src={course.thumbnail} loading="lazy" alt="XXX" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"/>
        
        </div>

        <div className="text-white p-4 flex flex-col gap-2">

            <h1 className="font-nuninto tracking-wide font-semibold text-lg">{course.coursename}</h1>

            {
                    course.coursedescription.length > 75 ? <div>
        
                        {
                            showFullString ? <p className="text-[#8f98ac] tracking-wide font-nuninto">{course.coursedescription.slice(0)} <span onClick={()=> setShowFullString(false)} className="text-blue-500">Read less</span></p> : <p className="text-[#8f98ac] tracking-wide font-nuninto">{course.coursedescription.slice(0,60)} <span onClick={()=> setShowFullString(true)} className="text-blue-500">...Read more</span></p>
                        }
        
                    </div> : <p className="text-[#8f98ac] tracking-wide font-nuninto">{course.coursedescription}</p>
            }

            <p className="font-lexend font-light">by {course.teacher.firstname} {course.teacher.lastname}</p>

            <div className="flex items-center gap-1.5 font-lexend font-light">

                <ReactStars count={5} size={23} value={getaveragerating(course?.ratingandreviews)} color1={'gray'} color2={'#ffd700'} edit={false}/>

                <span className="pt-[1px]">{getaveragerating(course?.ratingandreviews)}</span>

                <span className="pt-[1px]">({course?.ratingandreviews.length})</span>

            </div>

            <div className="flex items-center gap-5 font-lexend tracking-wide font-light text-[#dbdded]">

                <div className="flex items-center gap-1.5">

                    <LuClock></LuClock>

                    <span>{caldur(course)}</span>

                </div>

                <div className="flex items-center gap-1.5">

                    <GoPeople size={17}></GoPeople>

                    <span className="pt-[0px]">{course?.studentenrolled.length}</span>

                </div>

            </div>

            <div className="flex items-center justify-between mt-3.5 sm:mt-2">
                
                <p className="text-[#16a249] font-lexend text-[19px]">Rs {course?.price}</p>

                <button className="bg-[#7888f7] font-nuninto font-semibold px-2 pt-1 pb-[5px] rounded-lg" onClick={()=> navi(`/course/${course._id}`)}>Enroll Now</button>

            </div>

        </div>

    </div>

  )

}

// {
//     "_id": "68d6cee3e39a42667a27e3fd",
//     "coursename": "Course 2",
//     "coursedescription": "About course 2 and its details.",
//     "whatyouwilllearn": "Point 1 in details",
//     "courselanguage": "Spanish",
//     "teacher": {
//         "_id": "68bc7758556efb471b8ce19b",
//         "firstname": "Rubel",
//         "lastname": "Maratha"
//     },
//     "coursecontent": [
//         {
//             "_id": "68d6cee9e39a42667a27e402",
//             "sectionname": "Section 1",
//             "subsection": [
//                 {
//                     "_id": "68d6cf01e39a42667a27e408",
//                     "title": "S1 T1",
//                     "timeduration": "75.84",
//                     "description": "S1 D1",
//                     "videourl": "https://res.cloudinary.com/doeclcssz/video/upload/v1758908136/Learnova/badsqjfpf1ff4rnyz3fi.mp4",
//                     "sectiontowhichitbelong": "68d6cee9e39a42667a27e402",
//                     "__v": 0
//                 }
//             ],
//             "__v": 0
//         }
//     ],
//     "ratingandreviews": [],
//     "price": 1,
//     "thumbnail": "https://res.cloudinary.com/doeclcssz/image/upload/v1758908107/Learnova/srokqebeuhh7spbvyjpx.jpg",
//     "createdat": "2025-09-26T17:35:31.769Z",
//     "category": "67bc8a863ba49102ce51f786",
//     "studentenrolled": [
//         "68bc78bc556efb471b8ce1ac"
//     ],
//     "__v": 0,
//     "status": "Published"
// }