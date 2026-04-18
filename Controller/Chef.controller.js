

const {cloudinary}=require("../config/cloudinary");

const Chef=require("../model/Chef.model");
 const {mongoose}=require("mongoose");


// create a chef
const createChef=async(req,res)=>{
      try{

          const {name,Adress,email,phone,experience,city,state,area,country,pincode,profilepicture}=req.body;

            if(!name || !Adress ||!email ||!phone ||!experience||!city||!state||!area||!country||!pincode||!profilepicture){
                 return res.status(400).json({message:"All fields are required"});
            }

              const existingChef=await Chef.findOne({email:email});
               if(existingChef){
                  return res.status(200).json({message:"Chef are already exist"});
               }

                const newChef=new Chef({
                     name,
                     Adress,
                     email,
                     phone,
                     experience,
                     city,
                     state,
                     area,
                     country,
                     pincode,
                     profilepicture,
                })

                await newChef.save();

                 res.status(201).json({
                     message:"Chef created Successfull",
                     data:newChef
                 })
      }catch(err){
         console.log(err);
          res.status(500).json({message:"Internal Server error"});
      }
}

const getAllChef=async(req,res)=>{

      try{

          const Chefs=await Chef.find();

            res.status(200).json({message:"Chef fetched Sucessfully",data:Chefs});

      }catch(err){
         console.log(err);
          res.status(500).json({message:"Internal Server error"});
      }
}
 
 const getById=async(req,res)=>{
       try{
              const {id}=req.params;
               
               const getChef=await Chef.findById(id);
                if(!getChef){
                     return res.status(404).json({message:"Not found"});
                }

                 res.status(200).json({message:"Chef is Find",data:getChef});
       }catch(err){
          console.log(err);
           res.status(500).json({message:"Internal Server error"});
       }
 }

  const UpdateChef=async(req,res)=>{
         try{
                const {id}=req.params;
                 
                const{name,Adress,email,phone,experience,city,state,area,country,pincode,profilepicture}=req.body;
                 let imageUrl="";
                  if(profilepicture){
                     const result=await cloudinary.uploader.upload(profilepicture,{
                         folder:"Chef",

                     });
                     imageUrl=result.secure_url;
                  }

                  const upchef= await Chef.findByIdAndUpdate(id,{
                       name,
                     Adress,
                     email,
                     phone,
                     experience,
                     city,
                     state,
                     area,
                     country,
                     pincode,
                     profilepicture,
                  },{new:true})

                  res.status(200).json({message:"Updated SuccessFully",data:upchef});
         }catch(err){
              console.log(err);
               res.status(500).json({message:"Internal Server error"});
         }
  }

  const deleteChefById=async(req,res)=>{
                 try{
  
  
                  
               const {id}=req.params;
               if(!id.match(/^[0-9a-fA-F]{24}$/)){
                       return res.status(400).json({message:"Invalid id"});
  
               }
  
                  const existingChef=await Chef.findById(id);
                  if(!existingChef){
                      return res.status(400).json({message:"Chef is not found boss"});
                  }
  
                  //delte the testimonial
                  const deleteChef=await Chef.findByIdAndDelete(existingChef);
  
                   res.status(200).json({
                        message:"Chef Deleted Successfullu",
                        data:deleteChef
                   })
  
                   }catch(err)
                   {
  
                       console.log(err);
                        res.status(500).json({message:"Internal Server error"});
                   }
         }


         const deleteAllChef=async(req,res)=>{

              try{
                     const chef=await Chef.deleteMany();
                     res.status(200).json({message:"Delete Successfully",data:chef});

              }catch(err){
                   console.log(err);
                   res.status(500).json({message:"Internal Server error"});
              }
         }
module.exports={
     createChef,
     getAllChef,
     getById,
     UpdateChef,
     deleteChefById,
     deleteAllChef,
}