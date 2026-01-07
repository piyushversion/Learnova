
function Leftside(props){

    return(

        <div className="relative w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%]">

            <img src={props.image} alt="XXX" className="h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>

            <div className="absolute bottom-0 pl-[15px] sm:pl-10 pb-4 sm:pb-8 font-nuninto text-white">

                <h1 className="text-[20px] sm:text-3xl pb-1">{props.heading}</h1>

                <p>{props.subheading}</p>

            </div>

        </div>
    )
}

export default Leftside;