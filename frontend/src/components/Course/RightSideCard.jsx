import { useSelector } from "react-redux"

export const RightSideCard = () => {

    const {title,description,imagee,noofsec,nooflec,estimateddur} = useSelector((state)=>state.Rightside);

    const course = useSelector((state)=>state.Course.course);

    return (

        <div className="bg-[#020813] w-[100%] sm:w-[75%] md:w-[70%] lg:w-[45%] xl:w-[30%] px-4 py-[18px] sm:p-5 rounded-xl border-2 border-[#303036] flex flex-col gap-3 sticky top-3">

            <h3 className="text-base sm:text-lg font-lexend mb-2">Course Preview</h3>

            {

                imagee ? <img src={imagee} alt="XXX" className="rounded-xl"/> : <span className="text-[#79808a] text-[15px] sm:text-base">Course Thumbnail</span>

            }

            <h3 className="font-nuninto text-base sm:text-lg font-medium">
                
                {title ? title : <span className="text-[#79808a]">Course Name</span>}

            </h3>

            <p className="font-nuninto text-[15px] sm:text-base">
                
                {description ? description : <span className="text-[#79808a]">Course Description</span>}
                
            </p>

            <div className="h-[1px] bg-[#79808a]"></div>

            <div className="flex items-center justify-between font-nuninto text-[15px] sm:text-base">

                <h3>Sections :</h3>

                <span>{noofsec}</span>

            </div>

            <div className="flex items-center justify-between font-nuninto text-[15px] sm:text-base">

                <h3>Lectures :</h3>

                <span>{nooflec}</span>

            </div>

            <div className="flex items-center justify-between font-nuninto text-[15px] sm:text-base">

                <h3>Estimated Duration :</h3>

                <span>{estimateddur} min</span>

            </div>

        </div>

    )

}