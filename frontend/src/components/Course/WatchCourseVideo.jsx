import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { apiconnector } from "../../services/apiconnector";
import { courseurl } from "../../services/apis";
import { updateCompletedLectures } from "../../redux/ViewCourseslice";
import { BsFileArrowUpFill } from "react-icons/bs";

const WatchCourseVideo = ({coursefulldata,coursesectiondata,coursecompletedlectures,totalnumoflectures,sectionIndex,setSectionIndex,activeSectionId,setActiveSectionId,activeSubSectionId,setActiveSubSectionId,subSectionIndex,setSubSectionIndex,sectionIndexx,setSectionIndexx,percentage,setPercentage,open,setOpen}) => {

    const[videoUrl,setVideoUrl] = useState(null);

    const dispatch = useDispatch();

    const[videoEnded,setVideoEnded] = useState(false);

    const[playing,setPlaying] = useState(false);

    const playerref = useRef(null);

    const{token} = useSelector((state)=>state.Auth);

    const isfirstvideo = () => {

      const currentsectionindex = coursesectiondata.findIndex((section) => section._id === activeSectionId);

      const currentsubsectionindex = coursesectiondata[currentsectionindex].subsection.findIndex((subsec)=>subsec._id === activeSubSectionId)

      if(currentsectionindex === 0 && currentsubsectionindex === 0){

          return true;

      } else{

          return false;

      }

    }

    const islastvideo = () => {

      const currentsectionindex = coursesectiondata.findIndex((section)=>section._id === activeSectionId)

        const currentsubsectionindex = coursesectiondata[currentsectionindex].subsection.findIndex((subsec)=>subsec._id === activeSubSectionId)

        const numoflectures = coursesectiondata[currentsectionindex].subsection.length;

        if(currentsectionindex === coursesectiondata.length-1 && currentsubsectionindex === numoflectures-1){

            return true;

        } else{

            return false;

        }

    }

    const nextvideo = () => {

      const currentsectionindex = coursesectiondata.findIndex((section)=>section._id === activeSectionId)

      const currentsubsectionindex = coursesectiondata[currentsectionindex].subsection.findIndex((subsec)=>subsec._id === activeSubSectionId)

      const numoflectures = coursesectiondata[currentsectionindex].subsection.length;

      if(currentsubsectionindex !== numoflectures - 1){

        const nextsubsecid = coursesectiondata[currentsectionindex].subsection[currentsubsectionindex+1]._id;

        setActiveSubSectionId(nextsubsecid);

        setSubSectionIndex(currentsubsectionindex+1);

      } else{

        const nextsecid = coursesectiondata[currentsectionindex+1]._id;

        const firstsubsecid = coursesectiondata[currentsectionindex+1].subsection[0]._id;

        setActiveSectionId(nextsecid);

        setActiveSubSectionId(firstsubsecid);

        setSectionIndex(currentsectionindex+1);

        setSubSectionIndex(0);

        setSectionIndexx(currentsectionindex+1);


      }

    }

    const previousvideo = () => {

      const currentsectionindex = coursesectiondata.findIndex((section)=>section._id === activeSectionId)

      const currentsubsectionindex = coursesectiondata[currentsectionindex].subsection.findIndex((subsec)=>subsec._id === activeSubSectionId)

      if(currentsubsectionindex !== 0){

        const previoussubsecid = coursesectiondata[currentsectionindex].subsection[currentsubsectionindex-1]._id;

        setActiveSubSectionId(previoussubsecid);

        setSubSectionIndex(currentsubsectionindex-1);

      } else{

        const previoussecid = coursesectiondata[currentsectionindex-1]._id;

        const numoflecturess = coursesectiondata[currentsectionindex-1].subsection.length;

        const lastsubsecid = coursesectiondata[currentsectionindex-1].subsection[numoflecturess-1]._id;

        setActiveSectionId(previoussecid);

        setActiveSubSectionId(lastsubsecid);

        setSectionIndex(currentsectionindex-1);
        
        setSectionIndexx(currentsectionindex-1);

        setSubSectionIndex(numoflecturess-1);

      }

    }

    const lecturecomplete = async() => {

      const toastid = toast.loading("Loading...");

      try{

          const res = await apiconnector("POST",courseurl.updatecourseprogress,{courseid:coursefulldata._id,subsectionid:activeSubSectionId},{

            "Authorization": `Bearer ${token}`

          })

          if (!res?.data?.success) {
 
            throw new Error(res?.data?.message || "Unknown error");
 
          }

          setPercentage(((coursecompletedlectures.length + 1)/totalnumoflectures)*100);

          dispatch(updateCompletedLectures(activeSubSectionId));

          toast.success("Lecture completed successfully");

      } catch(err){

          console.log("Error in updating course progress: ",err);
     
          toast.error(err?.response?.data?.message || err.message);

      } finally{

          toast.dismiss(toastid);

      }

    }

    useEffect(()=>{

      setVideoUrl(coursesectiondata?.[sectionIndex]?.subsection?.[subSectionIndex]?.videourl);

      setVideoEnded(false);

    },[activeSectionId,activeSubSectionId,sectionIndex,subSectionIndex])

  return (

    <div className="w-full sm:flex-1 overflow-hidden pt-20 pb-2 px-4 bg-[#181825] overflow-y-scroll no-scrollbar">
        
      { videoUrl &&

          <div className={`${open ? "" : "w-[98%] md:w-[95%] lg:w-[90%] xl:w-[80%]"} mx-auto relative overflow-hidden`}>

            <ReactPlayer ref={playerref} src={videoUrl} controls playing={playing} muted onEnded={()=>{setVideoEnded(true);setPlaying(false)}} style={{height:"100%",width:"100%",objectFit:"fill"}}></ReactPlayer>

            {
              videoEnded && <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center z-10 gap-2">

                  {!coursecompletedlectures.includes(activeSubSectionId) && <button onClick={lecturecomplete} className="bg-[#f59f0ae6] text-white px-2.5 pt-1 pb-[6px] font-lexend rounded-md font-[350] text-xs sm:text-base">Mark as completed</button>}

                  {<button onClick={()=>{setPlaying(true);setVideoEnded(false)}} className="bg-[#f59f0ae6] text-white px-2.5 pt-1 pb-[6px] font-lexend rounded-md font-[350] text-xs sm:text-base">Rewatch</button>}

                  {!isfirstvideo() && <button onClick={previousvideo} className="bg-[#f59f0ae6] text-white px-2.5 pt-1 pb-[6px] font-lexend rounded-md font-[350] text-xs sm:text-base">Previous</button>}

                  {!islastvideo() && <button onClick={nextvideo} className="bg-[#f59f0ae6] text-white px-2.5 pt-1 pb-[6px] font-lexend rounded-md font-[350] text-xs sm:text-base">Next</button>}

              </div>
            }

            { !open &&

              <button className="absolute top-1/2 -left-1 -translate-y-1/2 text-[#dbdded]" onClick={()=>setOpen(!open)}>

              <BsFileArrowUpFill className={`text-2xl sm:text-4xl rotate-90`}></BsFileArrowUpFill>

            </button>

            }

          </div>
      }

      <div className={`mt-3 ${open ? "" : "w-[98%] md:w-[95%] lg:w-[90%] xl:w-[80%]"} mx-auto`}>

        <h3 className="text-white text-xl pb-1 font-nuninto">{coursesectiondata?.[sectionIndex]?.subsection?.[subSectionIndex]?.title}</h3>

        <p className="text-[#dbdded] font-nuninto">{coursesectiondata?.[sectionIndex]?.subsection?.[subSectionIndex]?.description}</p>

      </div>

        
    </div>

  )

}

export default WatchCourseVideo