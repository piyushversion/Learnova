import Leftside from "../Reusable/Leftside";
import Rightside from "../Reusable/Rightside";
import loginimage from "../../assets/utilities image/loginimage.jpg"

function Loginpage(){

    return (

        <div className="bg-[#020813]">
            
            <div className="flex justify-center flex-col items-center gap-[55px] lg:gap-0 lg:items-stretch lg:flex-row pt-[110px] pb-[52px]">

                <Leftside image={loginimage} heading={"Welcome Back!"} subheading={"Continue your learning journey with us."}></Leftside>

                <Rightside showlogin={true} showsignup={false}></Rightside>

            </div>

        </div>

    )
}

export default Loginpage;