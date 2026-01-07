
const Hambuger = ({open,setOpen}) => {

    return (

        <button onClick={()=>setOpen(!open)} className="text-white flex flex-col gap-1 justify-center w-[27px] sm:w-7 h-max lg:hidden">

            <span className={`w-full h-[3px] sm:h-[3px] bg-[#dbdded] rounded transition-all duration-300 ${open ? "rotate-45 translate-y-[8px] sm:translate-y-[6px]":""}`}></span>

            <span className={`w-full h-[3px] sm:h-[3px] bg-[#dbdded] rounded transition-all duration-300 ${open ? "opacity-0":"opacity-100"}`}></span>

            <span className={`w-full h-[3px] sm:h-[3px] bg-[#dbdded] rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6px] sm:-translate-y-[8px]":""}`}></span>

        </button>

    )

}

export default Hambuger