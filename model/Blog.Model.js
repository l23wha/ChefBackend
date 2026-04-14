const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    

    
    category: {
        type: String,
        enum: ["trending", "partner", "foodrecipe","Must Read"],
        required: true
    },

    image: {
        type: String
    }
}, { timestamps: true }); // 



module.exports = mongoose.model('Blog', blogSchema);