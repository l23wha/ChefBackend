 const {createBooking}=require("../Controller/Booking.controller");
  const {verifyToken}=require("../MiddleWare/authmiddleware");
const router=require("express").Router();

router.post('/createBooking',verifyToken,createBooking);



module.exports=router;