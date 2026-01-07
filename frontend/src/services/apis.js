const base_url = import.meta.env.VITE_base_url;

export const categoriesurl = {

    createcategoryapi: `${base_url}/course/createcategory`,
    showallcategory:`${base_url}/course/getallcategories`,
    categorypagedetails:`${base_url}/course/categorypagedetails`

}

export const authenticationurl = {

    getresetpasswordtoken:`${base_url}/user/resetpassword`,
    updatepassword:`${base_url}/user/actualresetpassword`,
    sendotpapi:`${base_url}/user/sendotp`,
    signup:`${base_url}/user/signup`,
    login:`${base_url}/user/login`,
    changepassword:`${base_url}/user/changepassword`

}

export const contactusurl = `${base_url}/user/contactus`;

export const profileurl = {

    updateprofilepicture:`${base_url}/profile/updateprofilepicture`,
    updateprofile:`${base_url}/profile/updateprofile`,
    enrolledcourses:`${base_url}/profile/getenrolledcoursesofstudent`,
    getinstructorstats:`${base_url}/profile/getinstructorstats`

}

export const courseurl = {

    createcourse:`${base_url}/course/createcourse`,
    editcourse:`${base_url}/course/editcourse`,
    createsection:`${base_url}/course/createsection`,
    updatesection:`${base_url}/course/updatesection`,
    deletesection:`${base_url}/course/deletesection`,
    createsubsection:`${base_url}/course/createsubsection`,
    deletesubsection:`${base_url}/course/deletesubsection`,
    editsubsection:`${base_url}/course/updatesubsection`,
    getallcoursesofinstructor:`${base_url}/course/getallcoursesofteacher`,
    deletecourse:`${base_url}/course/deletecourse`,
    getdetailsofparticularcourse:`${base_url}/course/getfulldetailsofparticularcourse`,
    completefullcourse:`${base_url}/course/completefullcourse`,
    updatecourseprogress:`${base_url}/course/updatecourseprogress`,
    getfulldetailsofcourse:`${base_url}/course/getfulldetailsofcourse`

}

export const paymenturl = {

    createorder:`${base_url}/payment/createorder`,
    verifypayment:`${base_url}/payment/verifypayment`,
    sendpaymentsuccessfullemail:`${base_url}/payment/sendpaymentsuccessfullemail`,
    freeenrollment:`${base_url}/payment/freeenrollment`

}

export const ratingandreviewsurl = {

    createrating:`${base_url}/course/createratingandreviews`,
    getallrating:`${base_url}/course/getallratingandreviews`

}