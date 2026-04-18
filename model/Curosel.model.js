const mongoose = require('mongoose');

const CuroselSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
   
    
   

    image: {
        type: String
    }
    ,
    action:{
        type:String
    }
}, { timestamps: true }); // 



module.exports = mongoose.model('Curosel', CuroselSchema);