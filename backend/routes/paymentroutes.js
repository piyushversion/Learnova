const express = require("express");

const router = express.Router();

const{createOrder,verifyPayment,sendpaymentsuccessfullmail,freeenrollment} = require("../controllers/paymentcontroller");
const { authenticationmiddleware, isstudentmiddleware } = require("../middlewares/authmiddleware");

router.post("/createorder",authenticationmiddleware,isstudentmiddleware,createOrder);

router.post("/verifypayment",authenticationmiddleware,isstudentmiddleware,verifyPayment);

router.post("/sendpaymentsuccessfullemail",authenticationmiddleware,isstudentmiddleware,sendpaymentsuccessfullmail);

router.post("/freeenrollment",authenticationmiddleware,isstudentmiddleware,freeenrollment);

module.exports = router