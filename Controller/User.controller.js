const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

 const User=require('../model/User.mode');

 const JWT_SECRET=process.env.JWT_SECRET || "chefkart";

   const generateToken=(userId)=>{
    return jwt.sign({userId},JWT_SECRET,{expiresIn:'1h'});  
   };

   const UserSignup=async(req,res)=>{
   
      try{
          const {name,email,password}=req.body;
            if(!name|| !email || !password){
                return res.status(400).json({message:"All fields are required"});
            }
              const existingUser=await User.findOne({email});
             // validation of the existing user
            if(existingUser){
                return res.status(400).json({message:"User already exists"});
            }
             // hashing of the password
             const hasedPassword=await bcrypt.hash(password,12);

                 //create a new user 
                const NewUser=await User.create({
                    name,
                    email,
                    password:hasedPassword
                });

                //save the user to the database
                await NewUser.save();

                //generate a token for the user
                const token=generateToken(NewUser._id);
                 
                 res.status(201).json({
                    message:"User created successfully",
                     user:{
                         _id:NewUser._id,
                            name:NewUser.name,
                            email:NewUser.email,
                            
                     },
                     token
                 });

                  
      }catch(err){

           
            console.error(err);
            res.status(500).json({message:"Server error"});

      }

   };

    const UserLogin=async(req,res)=>{       
                
          try{
              const {email,password}=req.body;
                if(!email || !password){   
                    return res.status(400).json({message:"All fields are required"});
                }
                 const user=await User.findOne({email});
                    if(!user){  
                        return res.status(400).json({message:"Invalid credentials"});
                    }

                    const isMatch=await bcrypt.compare(password,user.password);
                        if(!isMatch){
                            return res.status(400).json({message:"Invalid credentials"});
                        }

                        const token=generateToken(user._id);
                            res.status(200).json({
                                message:"Login successful",
                                user:{
                                    _id:user._id,
                                    name:user.name,
                                    email:user.email,
                                },
                                token,
                            });

          }catch(err){
 
              console.error(err);
                res.status(500).json({message:"Login failed"});
          }
    };

    module.exports={UserSignup,UserLogin};