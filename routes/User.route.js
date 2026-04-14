const router=require("express").Router();
 const {UserSignup,UserLogin}=require("../Controller/User.controller");
router.post("/signup",UserSignup);
router.post("/login",UserLogin);

  


module.exports=router;
   