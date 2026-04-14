const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
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
        enum: ["For singles", "for families", "for Students","for couples"],
        required: true
    },

    image: {
        type: String
    }
}, { timestamps: true }); // 🔥 auto createdAt & updatedAt



module.exports = mongoose.model('Home', HomeSchema);