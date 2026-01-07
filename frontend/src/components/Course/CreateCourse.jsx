import { Sidebar } from '../Reusable/Sidebar'
import { Steps } from './Steps'
import { RightSideCard } from './RightSideCard'
import { useDispatch, useSelector } from 'react-redux';
import { CourseSetup } from "./CourseSetup";
import { CourseStructure } from "./CourseStructure";
import { Finalize } from "./Finalize";
import { useEffect } from 'react';
import { resetCourseState, setEditCourse } from '../../redux/Courseslice';
import toast from 'react-hot-toast';

const CreateCourse = () => {

  const step =  useSelector((state)=>state.Course.step);

  const {editcourse} = useSelector(state => state.Course);

  const dispatch = useDispatch();

  return (

    <div className='flex flex-col-reverse md:flex-row bg-[#181825] h-screen overflow-hidden'>
        
        <Sidebar></Sidebar>

        <div className='pt-[90px] pb-5 px-4 sm:px-[20px] xl:px-[26px] w-full md:w-[69%] lg:w-[76%] xl:w-[81%] overflow-y-scroll no-scrollbar'>

            <h3 className='text-[#dbdded] font-lexend text-[26px] mb-[1px] tracking-wide text-center sm:text-left'>Create Course</h3>

            <p className='text-[#79808a] text-lg text-center sm:text-left'>Create and publish your course content</p>

            <Steps></Steps>

            <div className='text-white flex gap-7 mt-4 items-center xl:items-start xl:flex-row flex-col'>

              {

                step === 1 && <CourseSetup></CourseSetup>

              }

              {

                step === 2 && <CourseStructure></CourseStructure>
                  
              }   

              {

                step === 3 && <Finalize></Finalize>

              }

              <RightSideCard></RightSideCard>

            </div>

        </div>

    </div>

  )
  
}

export default CreateCourse