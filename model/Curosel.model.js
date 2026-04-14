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
}, { timestamps: true }); // 🔥 auto createdAt & updatedAt



module.exports = mongoose.model('Curosel', CuroselSchema);