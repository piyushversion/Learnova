import { useForm,Controller } from "react-hook-form";
import { MdOutlineSubtitles } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { TbCategoryPlus } from "react-icons/tb";
import { LuGalleryThumbnails } from "react-icons/lu";
import { MdLanguage } from "react-icons/md";
import Switch from "react-switch";
import { AiOutlineAim } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { LuUpload } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { PuffLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"
import { courseurl } from "../../services/apis";
import { apiconnector } from '../../services/apiconnector';
import { setCourse, setStep } from "../../redux/Courseslice";
import { setDescription, setImagee, setTitle } from "../../redux/Rightsideslice";

export const CourseSetup = () => {

    const dispatch = useDispatch();

    const{register,control,handleSubmit,reset,setValue,getValues,formState:{errors,isValid}} = useForm({mode:"onChange"});

    const categories = useSelector(state => state.Category.categories);

    const[loading,setLoading] = useState(false);

    const {editcourse,course} = useSelector(state => state.Course);

    const token = useSelector((state) => state.Auth.token);

    const [preview,setPreview] = useState(null);

    const [isDragActive, setIsDragActive] = useState(false);

    const isFormUpdated = () => {

        const currentvalues = getValues();

        // console.log(currentvalues.coursetitle !== course?.coursename);
        // console.log(currentvalues.coursedesc !== course?.coursedescription);
        // console.log(currentvalues.courseprice !== course?.price);
        // console.log(currentvalues.coursecategory !== course?.category);
        // console.log(currentvalues.whatyouwilllearn !== course?.whatyouwilllearn);
        // console.log(currentvalues.coursethumbnail !== course?.thumbnail);
        // console.log(currentvalues.courselanguage !== course?.courselanguage);

        if(currentvalues.coursetitle !== course?.coursename || currentvalues.coursedesc !== course?.coursedescription || currentvalues.courseprice !== course?.price || currentvalues.coursecategory !== course?.category || currentvalues.whatyouwilllearn !== course?.whatyouwilllearn || currentvalues.coursethumbnail !== course?.thumbnail || currentvalues.courselanguage !== course?.courselanguage){

            return true;

        }

        return false;

    }

    const formsubmit = async(data) => {

        if(editcourse){

            if(isFormUpdated()){

                const currentvalues = getValues();

                const formdata = new FormData();

                formdata.append("courseid",course._id);

                if(currentvalues.coursetitle !== course?.coursename){

                    formdata.append("coursename",data.coursetitle);

                }

                if(currentvalues.coursedesc !== course?.coursedescription){

                    formdata.append("coursedescription",data.coursedesc);

                }

                if(currentvalues.courseprice !== course?.price){

                    formdata.append("courseprice",data.courseprice);

                }

                if(currentvalues.courselanguage !== course?.courselanguage){

                    formdata.append("courselanguage",data.courselanguage);

                }

                if(currentvalues.coursecategory !== course?.category){

                    formdata.append("coursecategory",data.coursecategory);

                }

                if(currentvalues.whatyouwilllearn !== course?.whatyouwilllearn){

                    formdata.append("whatyouwilllearn",data.whatyouwilllearn);

                }

                if(currentvalues.coursethumbnail !== course?.thumbnail){

                    formdata.append("coursethumbnail",data.coursethumbnail);

                }

                const toastid = toast.loading("Please wait...");

                setLoading(true);

                try{

                    const res = await apiconnector("POST",courseurl.editcourse,formdata,{

                        "Authorization": `Bearer ${token}`

                    })

                    if(!res.data.success){

                        throw new Error(res.data.message);

                    }

                    toast.success("Changes applyed successfully");

                    dispatch(setCourse(res.data.data));

                    dispatch(setTitle(res.data.data.coursename));

                    dispatch(setDescription(res.data.data.coursedescription));

                    dispatch(setImagee(res.data.data.thumbnail));

                    dispatch(setStep(2));

                } catch(err){

                    console.log("Error while applying changes",err);

                    toast.error(`${err.response.data.message}`);

                } finally{
   
                    toast.dismiss(toastid);

                    setLoading(false);

                }

            } else{

                toast.error("No changes were made!")

            }
            
            return;

        }

        const formdata = new FormData();

        formdata.append("coursetitle",data.coursetitle);
        formdata.append("coursedescription",data.coursedesc);
        formdata.append("whatyouwilllearn",data.whatyouwilllearn);
        formdata.append("courseprice",data.courseprice);
        formdata.append("courselanguage",data.courselanguage);
        formdata.append("coursecategory",data.coursecategory);
        formdata.append("thumbnailimage",data.coursethumbnail); 

        const toastid = toast.loading("Please wait...");

        setLoading(true);

        try{

            const res = await apiconnector("POST",courseurl.createcourse,formdata,{

                "Authorization": `Bearer ${token}`

            })

            if(!res.data.success){

                throw new Error(res.data.message);

            }

            toast.success("Course setup completed");

            dispatch(setCourse(res.data.data));
            
            dispatch(setTitle(res.data.data.coursename));

            dispatch(setDescription(res.data.data.coursedescription));

            dispatch(setImagee(res.data.data.thumbnail));

            dispatch(setStep(2));

        } catch(err){

            console.log("Error while creating course setup",err);

            toast.error(`${err.response.data.message}`);

        } finally{

            toast.dismiss(toastid);

            setLoading(false);

        }

    }

    const [checked, setChecked] = useState(false);

    const handleChange = nextChecked => {

        setChecked(nextChecked);

        if (nextChecked) {
            
            setValue("courseprice", 0, { shouldValidate: true });

        } else {

            setValue("courseprice", "", { shouldValidate: true });
        }

    };

    useEffect(()=>{

        if(editcourse){

            console.log(course);

            setValue("coursetitle",course?.coursename);
            setValue("coursedesc",course?.coursedescription);
            setValue("whatyouwilllearn",course?.whatyouwilllearn);

            if(course?.price == 0){

                setChecked(true);

            }

            setValue("courseprice",course?.price);
            setValue("courselanguage",course?.courselanguage);
            setValue("coursecategory",course?.category);
            setValue("coursethumbnail",course?.thumbnail);
            setPreview(course?.thumbnail);

        }

    },[])

    return(

        <>
            {
                loading ? <div className="h-[60vh] w-[70%] flex flex-col justify-center items-center gap-4"><p className="text-[#dbdded] text-[28px] sm:text-4xl font-nuninto tracking-wide">Please wait...</p> <PuffLoader color="#5d6eee" size={200}></PuffLoader></div> :

                <div className="bg-[#020813] w-[100%] sm:w-[95%] md:w-[90%] lg:w-[75%] xl:w-[70%] rounded-xl border-2 border-[#303036] px-[19px] sm:px-[25px] py-[25px]">

                    <form onSubmit={handleSubmit(formsubmit)} className="flex flex-col gap-[22px]">

                        <div className="flex flex-col gap-2">

                            <label htmlFor="coursetitle" className="flex items-center font-nuninto gap-2 w-max">

                                <MdOutlineSubtitles color="#eac754" className="text-[20px] sm:text-[22px]"></MdOutlineSubtitles>

                                <span className='text-base sm:text-lg tracking-wide'>Course Title <sup>*</sup></span>

                            </label>

                            <input type="text" id="coursetitle" placeholder="Enter Course Title" {...register("coursetitle",{required:"Course title is required",pattern:{ value: /^[A-Za-z0-9\s\-\+\&\.\/\(\),]+$/, message: "Only alphabets allowed"},maxLength: { value: 40, message: "Maximum 40 characters" }})} className='bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] w-full p-2.5 font-nuninto text-base'/>

                            {
                                errors.coursetitle && <span className="text-red-500 text-sm pt-1 italic font-rubik">{errors.coursetitle.message}</span>
                            }

                        </div>

                        <div className="flex flex-col gap-2">

                            <label htmlFor="coursedesc" className="flex items-center font-nuninto gap-2 w-max">

                                <TbFileDescription color="#eac754" className="text-[20px] sm:text-[22px]"></TbFileDescription>

                                <span className='text-base sm:text-lg tracking-wide'>Course Description <sup>*</sup></span>

                            </label>

                            <input type="text" id="coursedesc" placeholder="Enter Course Description" {...register("coursedesc",{required:"Course description is required",maxLength: { value: 100, message: "Maximum 100 characters" }})} className='bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] w-full p-2.5 font-nuninto'/>

                            {
                                errors.coursedesc && <span className="text-red-500 text-sm pt-1 italic font-rubik">{errors.coursedesc.message}</span>
                            }

                        </div>

                        <div className="flex flex-col gap-2">

                            <div className="flex items-start gap-[10px] sm:gap-0 sm:items-center justify-between flex-col sm:flex-row">

                                <label htmlFor="courseprice" className="flex items-center font-nuninto gap-2 w-max">

                                    <LiaRupeeSignSolid color="#eac754" className="text-[20px] sm:text-[22px]"></LiaRupeeSignSolid>

                                    <span className='text-base sm:text-lg tracking-wide'>Course Price <sup>*</sup></span>

                                </label>

                                <div className="flex gap-2 items-center flex-row-reverse sm:flex-row">

                                    <Switch onChange={handleChange} checked={checked} uncheckedIcon={false} checkedIcon={false} height={20} width={40} handleDiameter={20} onColor="#5d6eee" ></Switch>

                                    <span className="text-[#dbdded] font-lexend text-[15px]">Free Course</span>

                                </div>

                            </div>

                            <input type="text" id="courseprice" disabled={checked} placeholder={`${checked ? "Free" : "Enter Course Price"}`} inputMode="decimal" pattern="[0-9]*" {...register("courseprice",{required:"Course price is required",pattern:{ value: /^(?!0(\.0{1,2})?$)(?!0\d)\d+(\.\d{1,2})?$/, message: "Enter a valid price"},validate: value => parseFloat(value) <= 100000 || "Maximum allowed price is 100,000"})} className='bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] w-full p-2.5 font-nuninto'/>

                            {
                                errors.courseprice && <span className="text-red-500 text-sm pt-1 italic font-rubik">{errors.courseprice.message}</span>
                            }

                        </div>
                        
                        <div className="flex flex-col gap-2">

                            <label htmlFor="courselanguage" className="flex items-center font-nuninto gap-2 w-max">

                                <MdLanguage color="#eac754" className="text-[20px] sm:text-[22px]"></MdLanguage>

                                <span className='text-base sm:text-lg tracking-wide'>Course Language <sup>*</sup></span>

                            </label>

                            <select id="courselanguage" defaultValue="" {...register("courselanguage",{required:"Course language is required"})} className="bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] appearance-none w-full p-2.5 font-nuninto">

                                <option value="" className="bg-[#020813]"> -- Choose an language -- </option>

                                <option className="bg-[#020813]" value="English">English (EN)</option>
                                <option className="bg-[#020813]" value="Spanish">Spanish (ES)</option>
                                <option className="bg-[#020813]" value="Hinglish">Hinglish (HIE)</option>
                                <option className="bg-[#020813]" value="Japanese">Japanese (JA)</option>
                                <option className="bg-[#020813]" value="Hindi">Hindi (HI)</option>

                            </select>

                            {
                                errors.courselanguage && <span className="text-red-500 text-sm pt-1 italic font-rubik">{errors.courselanguage.message}</span>
                            }

                        </div>

                        <div className="flex flex-col gap-2">

                            <label htmlFor="coursecategory" className="flex items-center font-nuninto gap-2 w-max">

                                <TbCategoryPlus color="#eac754" className="text-[20px] sm:text-[22px]"></TbCategoryPlus>

                                <span className='text-base sm:text-lg tracking-wide'>Course Category <sup>*</sup></span>

                            </label>

                            <select id="coursecategory" defaultValue="" {...register("coursecategory",{required:"Course category is required"})} className="bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] appearance-none w-full p-2.5 font-nuninto">

                                <option value="" className="bg-[#020813]"> -- Choose an category -- </option>

                                {
                                    categories.length > 0 && categories.map((category,index)=>{

                                        return <option className="bg-[#020813]" key={index} value={category?._id}>{category?.name}</option>

                                    })
                                }

                            </select>

                            {
                                errors.coursecategory && <span className="text-red-500 text-sm pt-1 italic font-rubik">{errors.coursecategory.message}</span>
                            }

                        </div>

                        <div className="flex flex-col gap-2">

                            <label htmlFor="coursethumbnail" className="flex items-center font-nuninto gap-2 w-max">
                                
                                <LuGalleryThumbnails color="#eac754" className="text-[20px] sm:text-[22px]"></LuGalleryThumbnails>

                                <span className='text-base sm:text-lg tracking-wide'>Course Thumbnail <sup>*</sup></span>

                            </label>

                            <Controller name="coursethumbnail" control={control} rules={{ required: "Course thumbnail is required" }} render={({field:{onChange,value}}) => {

                                return <div onDragOver={(e) => {e.preventDefault(); setIsDragActive(true)}} onDragLeave={() => setIsDragActive(false)} onDrop={(e)=>{

                                    e.preventDefault();

                                    setIsDragActive(false);

                                    const file = e.dataTransfer.files[0];

                                    if (file && file.type.startsWith("image/")) {
                                        
                                        setPreview(URL.createObjectURL(file));

                                        onChange(file);
                                    }

                                }} onClick={() => document.getElementById("coursethumbnail").click()} className={`border-2 border-dashed rounded-lg w-full min-h-64 cursor-pointer flex justify-center items-center relative p-3.5 sm:p-5 transition-all duration-300 ${isDragActive ? "border-[#eac754] bg-[#eac754]/20" : "border-gray-400 hover:border-[#eac754] hover:bg-[#eac754]/5"}`}>

                                    {
                                        preview ? <img src={preview} alt="XXX" className="w-full rounded-lg object-cover"/> : <div className="flex flex-col items-center gap-5">
                                            
                                                <LuUpload size={45}></LuUpload>

                                                <p className="text-center">Drag and drop an image, or <span className="text-[#eac754]">Browse</span> a file </p>
                                            
                                            </div>
                                    }

                                    <input type="file" id="coursethumbnail" accept="image/png,image/jpg,image/jpeg,image/heic,image/heif" onChange={(e)=>{

                                        const file = e.target.files[0];

                                        if (file && file.type.startsWith("image/")) {

                                            setPreview(URL.createObjectURL(file));

                                            onChange(file);
                                        }

                                    }} className="hidden"/>

                                </div>

                            }}>

                            </Controller>

                            {errors.coursethumbnail && <span className="text-red-500 text-sm pt-1 italic font-rubik">{errors.coursethumbnail.message}</span>}

                        </div>

                        <div className="flex flex-col gap-2">

                            <label htmlFor="whatyouwilllearn" className="flex items-center font-nuninto gap-2 w-max">

                                <AiOutlineAim color="#eac754" className="text-[20px] sm:text-[22px]"></AiOutlineAim>

                                <span className='text-base sm:text-lg tracking-wide'>What you will learn <sup>*</sup></span>

                            </label>

                            {/* <input type="text" id="whatyouwilllearn" placeholder="Enter something" {...register("whatyouwilllearn",{required:"Something is required"})} className='bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] w-full p-2.5 font-nuninto'/> */}

                            <textarea id="whatyouwilllearn" placeholder="Enter what students will learn (one per line ie: one line will be considered as one point)" {...register("whatyouwilllearn", { required: "This field is required" })} className="bg-[#17171b]/45 border transition-all duration-75 border-[#303036] rounded-lg outline-0 focus:border-[#eac754] w-full p-2.5 font-nuninto overflow-hidden h-[120px]"/>

                            {
                                errors.whatyouwilllearn && <span className="text-red-500 text-sm pt-1 italic font-rubik">{errors.whatyouwilllearn.message}</span>
                            }

                        </div>

                        <div className="flex gap-2 justify-end mt-5 items-center flex-col sm:flex-row">

                            {

                                !editcourse && <button disabled={!isValid || loading} className={`font-nuninto flex items-center gap-1 pr-2.5 pl-3.5 py-1 rounded-lg ${isValid ? "bg-[#eac754] text-black cursor-pointer":"bg-[#242428] text-gray-400 cursor-not-allowed self-end w-full sm:w-max justify-center"}`}>
                                
                                    <span className="text-[17px] sm:text-[19px] font-semibold tracking-wide">Next</span>

                                    <IoIosArrowForward className="text-[17px] sm:text-[19px]"></IoIosArrowForward>

                                </button>
                            }

                            {

                                editcourse && <button className={`font-nuninto px-3.5 py-1.5 rounded-lg text-white cursor-pointer bg-[#242428] w-full sm:w-max`} onClick={()=>dispatch(setStep(2))}>
                                
                                    <span className="text-[17px] font-semibold tracking-wide">Continue</span>

                                </button>
                            }

                            {

                                editcourse && <button disabled={loading} className={`font-nuninto flex items-center gap-1 pr-2.5 pl-3.5 py-1.5 rounded-lg bg-[#eac754] text-black cursor-pointer w-full sm:w-max justify-center`}>
                                
                                    <span className="text-[17px] font-semibold tracking-wide">Apply Change</span>

                                    <IoIosArrowForward size={19}></IoIosArrowForward>

                                </button>
                            }

                        </div>                

                    </form>

                </div>

            }

        </>

    )

}