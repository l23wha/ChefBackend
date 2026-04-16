const {cloudinary}=require("../config/cloudinary");

 const Curosel=require("../model/Curosel.model");
const mongoose=require("mongoose");

 //create a curosel'

 const createCurosel=async(req,res)=>{

      try{
           const {title,content,image,action}=req.body;
           if(!title||!content||!image||!action){
              return res.status(400).json({message:"All feilds are required man"});
           }

            const newCurosel=new Curosel({
                  title,
                  content,
                  image,
                  action
            })
             await newCurosel.save();

              res.status(201).json({
                  message:"Curosel is successfully created",
                   data:newCurosel
              });
      }catch(error){
          console.log(error);

            res.status(500).json({
                 message:"Internal server error"
            });

      }
 }


   const getAllcurosel=async(req,res)=>{
      try{

         const Curosels=await Curosel.find();
            res.status(200).json({
                message:"Sucessfully fetched ",
                data:Curosels,
            });

      }catch(err){

         console.log(err);


          res.status(500).json({
            message:"Internal Server error"
          })
      }
   };


   const getCuroselById=async(req,res)=>{
         try{
               const {id}=req.params;
                  const Curosels=await Curosel.findById(id);
                  res.status(200).json({message:"find ",data:Curosels})

         }catch(err){
              console.log(err);
              res.status(500).json({
                 message:"Internal Server error",
              });

         }
   }

       const updateCurosel = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, action } = req.body;

    const existing = await Curosel.findById(id);
         
    if (!existing) {
      return res.status(404).json({ message: "Curosel not found" });
    }

    let imageUrl = existing.image;

    
    if (req.file) {
      imageUrl = req.file.path;
    }

    const updatedCurosel = await Curosel.findByIdAndUpdate(
      id,
      {
        title,
        content,
        image: imageUrl,
        action,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Updated Successfully",
      data: updatedCurosel,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};



    const deleteCurosel=async(req,res)=>{
         
          try{

                   const {id}=req.params;
                    if(!id.match(/^[0-9a-fA-F]{24}$/)){
                         return res.status(400).json({message:"Invalid blog Id for that curosel"});

                    }
                   const existingCurosel=await Curosel.findById(id);

                     if(!existingCurosel){
                        return res.status(404).json({message:"Curosel are not found"})
                     };
                     
                      const deletedCurosel=await Curosel.findByIdAndDelete(id);

                         res.status(200).json({message:"Curosel deleted Successfully"})
          }catch(err){

                 console.log(err);

                     res.status(200).json({message:"Internal Server error"});

          }
    }


    const deleteAllcurosel=async(req,res)=>{
           try{
              const Curosels=await Curosel.find();

               res.status(200).json({message:"All curosel deleted Successfullu",data:Curosels});

           }catch(err){
              console.log(err);
                res.status(500).json({message:"Internval Server error"});

           }
    }

 module.exports={
    createCurosel,
    getAllcurosel,
    getCuroselById,
    updateCurosel,
    deleteCurosel,
    deleteAllcurosel,
 }