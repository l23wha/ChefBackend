const { createTestimonial ,getAllTestimonial, getTestimonialsById, deleteTestimonial} = require("../Controller/Testimonial.controller");

 const router=require("express").Router();
 


    // create a blog route
     router.post("/createTestimonial",createTestimonial);
      router.get("/get",getAllTestimonial);
      router.get("/get/:id",getTestimonialsById);
      router.delete("/delete/:id",deleteTestimonial);
     

    module.exports=router;
