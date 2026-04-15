const {cloudinary}=require("../config/cloudinary");

const Gallery=require("../model/Gallery.model");


 const createGallery=async(req,res)=>{

           try{
               const{name,content,Galleryimage}=req.body;

               //validation process 
                if(!name || !content||! Galleryimage){
                      return res.status(400).json({message:"all fields are required"})
                }

                const newGallery=new Gallery({
                     name,
                     content,
                     Galleryimage
                });

                await newGallery.save();

                 res.status(201).json({message:"Gallery Created SuccessFully",data:newGallery});
           }catch(err){
              console.log(err);
              res.status(500).json({message:"Internval Server error"})
           }
 }

 const getAllGallery=async(req,res)=>{
     
          try{
             const Gallerys=await Gallery.find();
                  console.log("DATA:", Gallerys); 
             res.status(200).json(Gallerys);
              

          }catch(err){
                res.status(500).json({message:"Internval server error"});
          }
 }

  const deleteGallery=async(req,res)=>{
     
        try{
             
             const deleteGallery=await Gallery.deleteMany();

              res.status(200).json({
                   message:"Gallery Deleted Successfully",
                   data:deleteGallery,
              });



        }catch(errr){
              console.log(500).json({message:"Internal Server error"});
        }
  }

 module.exports={
    createGallery,
    getAllGallery,
    deleteGallery,
 }