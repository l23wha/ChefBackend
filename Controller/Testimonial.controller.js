const  {cloudinary}=require('../config/cloudinary')
const Testimonial=require('../model/Testimonial.model')

//create a testimonia

const createTestimonial=async(req,res)=>{

      try{
            const {name, content,profileimage}=req.body;
             if(!name || !content){
                   return res.status(400).json({message:"Please filled all fields"})                       
             }


             const newTestimonial=new Testimonial({
                 name,
                 content,
                 profileimage
             });
               
               await newTestimonial.save();

               res.status(200).json({message:"Testimonial is created sucessfully"});


      }catch(err){
              console.log(err);
            res.status(500).json({message:"Internal Server error"})
      }
}

//get all testimonials

 const getAllTestimonial=async(req,res)=>{

       try{
            const Tesimonial=await Testimonial.find();
             
              if(!Testimonial.length){
                   res.status(404).json({message:"No testimonial here"})
              }

                res.status(200).json({
                     message:"Tesimonial fetched succesfully",
                     data:Testimonial
                })
       }catch(err){
          console.log(err);
           res.status(500).json({message:"Internal server error"})
       }
 }

 //get a single testimonials

  const getTestimonialsById=async(req,res)=>{
     
         try{
             const {id}=req.params;
              const Testimonial=await Testimonial.findById(id);
              if(!Testimonial){
                   return res.status(404).json({message:"Testimonial not found"})
              }

               res.status(200).json({
                  message:"Testimonial fetched sucessfully",
                  data:Testimonial
               })
         }catch(err){
                
                   console.log(err);
                    res.status(500).json({message:"Internal Server error"});
         }


  }


       const deleteTestimonial=async(req,res)=>{
               try{


                
             const {id}=req.params;
             if(!id.match(/^[0-9a-fA-F]{24}$/)){
                     return res.status(400).json({message:"Invalid id"});

             }

                const existingtestimonial=await Testimonial.findById(id);
                if(!existingtestimonial){
                    return res.status(400).json({message:"Testimonial not found boss"});
                }

                //delte the testimonial
                const delteTest=await Testimonial.findByIdAndDelete(existingtestimonial);

                 res.status(200).json({
                      message:"Testimonial Deleted Successfullu",
                      data:delteTest
                 })

                 }catch(err)
                 {

                     console.log(err);
                      res.status(500).json({message:"Internal Server error"});
                 }
       }

module.exports={
    createTestimonial,
    getAllTestimonial,
    getTestimonialsById,
    deleteTestimonial,
}