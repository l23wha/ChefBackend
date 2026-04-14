const {cloudinary} = require('../config/cloudinary');
const Blog = require('../Model/Blog.Model');    


// create a blog 
const createBlog=async(req,res)=>{
        try{

              const {title,content,category,image}=req.body;
              // this is the validation for the blog creation
               if(!title || !content || !category || !image){
                   return res.status(400).json({error:"All fields are required"});
               }

                const newBlog=new Blog({
                     title,
                     content,
                     category,
                     image
                })
                await newBlog.save();

                res.status(201).json({
                    
                    message:"Blog created successfully",
                     blog:{
                         _id:newBlog._id,
                         title:newBlog.title,
                         content:newBlog.content,
                         category:newBlog.category,
                         image:newBlog.image
                     }
                });

        }catch(err){
                  console.error(err);
                    res.status(500).json({error:"Server error blog creation is  failed"});
        }
}


// get all blogs
 const getAllBlogs=async(req,res)=>{
            try{

                 const blogs=await Blog.find();
                  
                  if(!blogs || blogs.length===0){
                      return res.status(404).json({error:"No blogs found"});
                  }

                  res.status(200).json({blogs});

                   
                    
            }catch(err){
                 console.error(err);
                 res.status(500).json({error:"Server error while fetching blogs"});
            }
 }


 // for get a single blog by id

 const getBlogById=async(req,res)=>{

       try{
            const {id}=req.params;// mtlb hum id nikalege req.params se theek agar then check krege ki agr us id ka blog present hai ki nhi 

            const blog=await Blog.findById(id);

            if(!blog){
                return res.status(404).json({error:"Blog not found"});
            }
             
            res.status(200).json({blog});
       }catch(err){
 
           console.log(err);
           res.status(500).json({error:"Server error while fetching the blog"});

            

       }

 }


 // update all blogs

 const updateBlog=async(req,res)=>{

      try{
           const {id}=req.params;
              const {title,content,category,image}=req.body;
                 let imageUrl='';

                 //image uploading to cloudinary
               if(image){
                  const result=await cloudinary.uploader.upload(image,{
                      folder:"Image-folder",
                      allowed_formats:["jpg","jpeg","png"],
                  });
                  imageUrl=result.secure_url;
               }

               const updateBlogs=await Blog.findByIdAndUpdate(id,{
                    title,
                    content,
                    category,
                    image:imageUrl
               },{new:true});
               if(!updateBlogs){
                   return res.status(404).json({error:"Blog not found"});
               }
               res.status(200).json({message:"Blog updated successfully", blog:updateBlogs});
      }catch(err){
           console.error(err);
           res.status(500).json({error:"Server error while updating the blog"});

      }
 }


 //delete a blog

 const deleteBlog=async(req,res)=>{

         try{

             const {id}=req.params;
             const deleteBlogs=await Blog.findByIdAndDelete(id);
              if(!deleteBlogs){
                  return res.status(404).json({error:"Blog not found"});
              }
              res.status(200).json({message:"Blog deleted successfully"});
         }catch(err){
              console.error(err);
              res.status(500).json({error:"Server error while deleting the blog"});
         }
 }


 module.exports={createBlog,getAllBlogs,getBlogById,updateBlog,deleteBlog};