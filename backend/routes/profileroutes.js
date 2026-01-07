const express = require("express");

const router = express.Router();

const{updateprofile,getalldetailsofuser,updateprofilepicture,getenrolledcoursesofparticularstudent,getinstructorstats} = require("../controllers/profilecontroller");

const {authenticationmiddleware,isadminmiddleware,isstudentmiddleware,isteachermiddleware} = require("../middlewares/authmiddleware");

router.put("/updateprofile",authenticationmiddleware,updateprofile);

router.put("/updateprofilepicture",authenticationmiddleware,updateprofilepicture);

router.get("/getalldetailsofuser",authenticationmiddleware,getalldetailsofuser);

router.get("/getenrolledcoursesofstudent",authenticationmiddleware,getenrolledcoursesofparticularstudent);

router.get("/getinstructorstats",authenticationmiddleware,isteachermiddleware,getinstructorstats);

module.exports = router