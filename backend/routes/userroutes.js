const express = require("express");

const router = express.Router();

const{sendotp,signup,login,changepassword} = require("../controllers/authcontroller");

const{resetpassword,actualresetpassword} = require("../controllers/resetpasswordcontroller");

const{authenticationmiddleware,isadminmiddleware,isstudentmiddleware,isteachermiddleware} = require("../middlewares/authmiddleware");
const { contactus } = require("../controllers/contactuscontroller");

router.post("/login",login);

router.post("/signup",signup);

router.post("/sendotp",sendotp);

router.post("/changepassword",authenticationmiddleware,changepassword);

router.post("/resetpassword",resetpassword);

router.post("/actualresetpassword",actualresetpassword);

router.post("/contactus",contactus);

module.exports = router