const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
   

    

    profileimage: {
        type: String
    }
}, { timestamps: true }); 



module.exports = mongoose.model('Testimonial', TestimonialSchema);