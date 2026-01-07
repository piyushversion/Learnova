import Leftside from "../Reusable/Leftside";
import Rightside from "../Reusable/Rightside";
import signupimage from "../../assets/utilities image/signupimage.jpg"

function SignUppage(){

    return (

        <div className="bg-[#020813]">
            
            <div className="flex justify-center flex-col items-center gap-[55px] lg:gap-0 lg:items-stretch lg:flex-row pt-[110px] pb-[58px] rounded-xl">

                <Leftside image={signupimage} heading={"Join our Community"} subheading={"Start your learning journey today."}></Leftside>

                <Rightside showlogin={false} showsignup={true}></Rightside>

            </div>
            
        </div>

    )
}

export default SignUppage;