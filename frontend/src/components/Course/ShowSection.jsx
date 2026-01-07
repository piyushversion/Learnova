import { useSelector } from "react-redux"
import SectionCard from "./SectionCard";

export const ShowSection = () => {

    const course = useSelector((state)=> state.Course.course);

    return (

        <div className="py-14 flex flex-col gap-6">
        
            {
                course?.coursecontent?.map((section,index)=>{

                    return <SectionCard section={section} key={index}></SectionCard>

                })
            }

        </div>

    )

}