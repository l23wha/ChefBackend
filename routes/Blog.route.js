
 const router=require("express").Router();
 const {createBlog,getAllBlogs, getBlogById,updateBlog,deleteBlog}=require("../Controller/Blog.controller");
 const {upload}=require("../config/cloudinary");


    // create a blog route
     router.post("/create",createBlog);

     // get all blogs route
      router.get("/all",getAllBlogs);  
      
      router.get("/get/:id",getBlogById);
      router.put("/update/:id",updateBlog);
      router.delete("/delete/:id",deleteBlog);

    module.exports=router;