import { FaPlus } from "react-icons/fa6";

export const NoSectionYetCard = () => {

    return (

        <div className="flex flex-col items-center gap-5 py-14">

            <div className="bg-[#242428] text-gray-400 rounded-full p-5"><FaPlus size={25}></FaPlus></div>

            <p className="font-nuninto tracking-wide text-gray-400 text-center">No sections yet. Create your first section to get started.</p>

        </div>

    )

}