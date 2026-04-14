const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
   

    

    Galleryimage: {
        type: String
    }
}, { timestamps: true }); 



module.exports = mongoose.model('Gallery', GallerySchema);