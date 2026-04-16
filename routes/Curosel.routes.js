const { createCurosel, getAllcurosel, getCuroselById, deleteCurosel, deleteAllcurosel, updateCurosel } = require("../Controller/Curosel.controller");


 const router=require("express").Router();
 


    // create a blog route
     router.post("/createCurosel",createCurosel);
      router.get("/get",getAllcurosel);
      router.get("/get/:id",getCuroselById);
      router.delete("/delete/:id",deleteCurosel);
       router.delete("/delete/",deleteAllcurosel);
       router.put("/updateCurosel/:id",updateCurosel);
     

    module.exports=router;
