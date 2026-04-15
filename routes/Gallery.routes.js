 const {createGallery, getAllGallery,deleteGallery}=require("../Controller/Gallery.controller");

 const router=require("express").Router();
 


    // create a blog route
     router.post("/createGallery",createGallery);
     router.get("/get",getAllGallery);
     router.delete("/delete",deleteGallery);
     
     

    module.exports=router;
