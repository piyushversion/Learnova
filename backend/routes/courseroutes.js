const express = require("express");

const router = express.Router();

const{createcourse,getallcourses,getfulldetailsofparticularcourse,editcourse,deletecourse,getallcoursesofteacher,getfulldetailsofcourse} = require("../controllers/coursecontroller");

const{createcategory,showallcategory,categorypagedetails} = require("../controllers/categorycontroller");

const{createsection,updatesection,deletesection} = require("../controllers/sectioncontroller");

const{createsubsection,updatesubsection,deletesubsection} = require("../controllers/subsectioncontroller");

const{createrating,getaverageratingofparticularcourse,getallratingandreviews} = require("../controllers/ratingandreviewscontroller");

const{authenticationmiddleware,isadminmiddleware,isstudentmiddleware,isteachermiddleware} = require("../middlewares/authmiddleware");

const{completefullcourse,updatecourseprogress} = require("../controllers/courseprogresscontroller");

router.post("/createcourse",authenticationmiddleware,isteachermiddleware,createcourse);

router.get("/getallcourses",getallcourses);

router.post("/getfulldetailsofparticularcourse",getfulldetailsofparticularcourse);

router.post("/getfulldetailsofcourse",authenticationmiddleware,isstudentmiddleware,getfulldetailsofcourse);

router.post("/editcourse",authenticationmiddleware,isteachermiddleware,editcourse);

router.delete("/deletecourse",authenticationmiddleware,isteachermiddleware,deletecourse);

router.get("/getallcoursesofteacher",authenticationmiddleware,isteachermiddleware,getallcoursesofteacher);


router.post("/createcategory",authenticationmiddleware,isadminmiddleware,createcategory);

router.get("/getallcategories",showallcategory);

router.post("/categorypagedetails",categorypagedetails); // in this controller pending task is there. but working fine


router.post("/createsection",authenticationmiddleware,isteachermiddleware,createsection);

router.put("/updatesection",authenticationmiddleware,isteachermiddleware,updatesection);

router.delete("/deletesection",authenticationmiddleware,isteachermiddleware,deletesection);

router.post("/createsubsection",authenticationmiddleware,isteachermiddleware,createsubsection);

router.put("/updatesubsection",authenticationmiddleware,isteachermiddleware,updatesubsection);

router.delete("/deletesubsection",authenticationmiddleware,isteachermiddleware,deletesubsection);


router.post("/updatecourseprogress",authenticationmiddleware,isstudentmiddleware,updatecourseprogress);

router.post("/completefullcourse",authenticationmiddleware,isstudentmiddleware,completefullcourse);


// testing of the below routes is pending becoz first any user had purchased the course then only he can give the rating and reviews
router.post("/createratingandreviews",authenticationmiddleware,isstudentmiddleware,createrating);

router.get("/getaverageratingofcourse",getaverageratingofparticularcourse);

router.get("/getallratingandreviews",getallratingandreviews);

module.exports = router