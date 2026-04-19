
 const Booking=require("../model/Booking.model");

 //create Booking

  const createBooking=async(req,res)=>{

       try{
           const {user,chef,bookingDate,status,notes}=req.body;

              if(!user || !chef ||!bookingDate||!status||!notes){
                   return res.status(400).json({message:"All fields are required"});
              }

              // create a new booking
               const newBooking=new Booking({
                 user,
                 chef,
                 bookingDate,
                 status,
                 notes
               });
                 await newBooking.save();
                   res.status(201).json({
                     message:"Booking create Successfulyyy",
                     data:newBooking
                   });

       }catch(err){
         console.log(err);
          res.status(500).json({message:"Internal Server error"});
       }
  }

  module.exports={
     createBooking,
  }