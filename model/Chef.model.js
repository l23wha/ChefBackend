const mongoose = require('mongoose');

const ChefSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Adress: {
        type: String,
        required: true
    },
    email:{
          type:String,
    },
   phone:{
     type:String,
      required:true,
   },
    expereince:{
         type:String,
    },
    city:{
        type:String,
         required: true
    },
    state:{
        type:String, 
        required: true
    },
    area:{
         type:String,
         required: true
    },
    country:{
        type:String,
         required: true
    },
    pincode:{
        type:String,
        required: true,
    },

    

    profilepicture: {
        type: String
    }
}, { timestamps: true }); 



module.exports = mongoose.model('Chef', ChefSchema);