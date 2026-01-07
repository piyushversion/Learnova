import React, { useRef, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { GoCheckCircle } from "react-icons/go";
import { sectodur } from '../../utils/duration';
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import toast from 'react-hot-toast';

const CourseSidebar = ({coursefulldata,coursesectiondata,coursecompletedlectures,totalnumoflectures,sectionIndex,setSectionIndex,activeSectionId,setActiveSectionId,activeSubSectionId,setActiveSubSectionId,subSectionIndex,setSubSectionIndex,reff,sectionIndexx,setSectionIndexx,percentage,setShowModal,open,setOpen}) => {

    const {user} = useSelector((state)=>state.User);

    const calsectiondur = (section) => {
  
        let totaldur = 0;
  
        section.subsection.forEach(subsection => {
  
            totaldur += parseInt(subsection.timeduration);
  
        })
  
        return sectodur(totaldur);
  
    }

  return (

    <div className={`flex flex-col ${open ? "w-full sm:w-[290px]" : "w-0"} flex-shrink-0 h-screen overflow-hidden pt-[85px] bg-[#020813]`}>
        
        <button className='w-max flex self-end mx-5 mb-5' onClick={()=>{setOpen(false)}}><IoClose color='#dbdded' size={30}></IoClose></button>

        <div className='flex flex-col gap-3.5 border-b-[1px] border-[#232936] px-5 pb-5'>

            <p className='font-nuninto text-[22px] tracking-wide text-white'>{coursefulldata?.coursename}</p>

            <div className='flex flex-col gap-2.5'>

                <div className='flex items-center font-lexend justify-between'>

                    <p className='text-[#94a3ba]'>Progress</p>

                    <p className='text-[#dbdded]'>{coursecompletedlectures?.length}/{totalnumoflectures}</p>

                </div>

                <div className="h-2 bg-gray-600 rounded-full w-full relative">

                    <div className="h-2 bg-[#6870e6] absolute rounded-full" style={{width:`${Math.trunc(percentage)}%`}}></div>

                </div>

                <div className='flex items-center gap-1 font-nuninto text-[#94a3ba]'>

                    <p>{Math.trunc(percentage)}%</p>

                    <p>completed</p>
                </div>

            </div>

            { !coursefulldata?.ratingandreviews?.some((item)=>item.userwhohasgivenrar === user.userinfo._id) &&

            <button className='bg-[#f59f0ae6] text-white px-2 pt-1 pb-[6px] font-lexend rounded-md font-[350]' onClick={()=>setShowModal(true)}>

                Add Review

            </button>

            }

        </div>

        <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar">

            {
                coursesectiondata.map((section,index) => {

                    return <div key={index} className='border-b-[1px] border-[#232936] px-2'>

                        <div className="flex items-center cursor-pointer my-3.5 gap-2 font-nuninto text-white" onClick={()=>setSectionIndexx(sectionIndexx === index ? null : index)}>

                            <div className={`${sectionIndexx === index ? "rotate-90":"rotate-0"} transition-all duration-300`}>
                            
                                <IoIosArrowForward color='#94a3ba'></IoIosArrowForward>

                            </div>

                            <div>

                                <p className='text-[17px] tracking-wider'>{section.sectionname}</p>

                                <p className='text-sm text-[#94a3ba] tracking-wide'>{calsectiondur(section)}</p>

                            </div>

                        </div>

                        <div ref={(el)=>reff.current[index] = el} className="overflow-hidden transition-all duration-300" style={{height:sectionIndexx === index ? `${reff.current[index]?.scrollHeight}px`:"0px"}}>
                        
                            <div className={`flex flex-col gap-3.5 pb-3.5`}>
                        
                            {
                                section.subsection.map((subsection,indexx) => {
                        
                                    return <div key={indexx} className={`flex justify-between items-center gap-2 w-[98%] mx-auto px-2 pt-[5px] pb-[8px] rounded-lg font-lexend cursor-pointer ${activeSubSectionId === subsection._id ? "bg-gray-700":""}`} onClick={()=>{setSectionIndex(index);setSubSectionIndex(indexx);setActiveSectionId(section._id);setActiveSubSectionId(subsection._id);setOpen(false)}}>
                                        
                                        <div className='flex items-center gap-2'>

                                            {

                                                coursecompletedlectures.includes(subsection._id) && <GoCheckCircle color='#21c45d'></GoCheckCircle>

                                            }
                                
                                            <span className="tracking-wide text-[#dbdded]">{subsection?.title}</span>

                                        </div>

                                        <span className='text-[#94a3ba] text-[15px]'>{Math.trunc(subsection?.timeduration)} sec</span>
                        
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
  )

}

export default CourseSidebar