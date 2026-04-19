const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require("dotenv").config();


// console.log("__dirname:", __dirname);
// console.log("cwd:", process.cwd());
// console.log("KEY:", process.env.CLOUDINARY_API_KEY);
 const UserRoutes=require("./routes/User.route");
 const BlogRoutes=require("./routes/Blog.route");
 const TestimonialRoutes=require("./routes/Testimonial.route")
 const GalleryRoutes=require("./routes/Gallery.routes");
 const CuroselRoutes=require("./routes/Curosel.routes");
 const ChefRoutes=require("./routes/Chef.route");
  const BookingRoutes=require("./routes/Booking.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
const connectDB = require('./config/db');
connectDB();
app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

 app.use('/auth',UserRoutes)
 app.use('/blog',BlogRoutes);
 app.use('/testimonial',TestimonialRoutes);
 app.use("/gallery",GalleryRoutes);
 app.use("/curosel",CuroselRoutes);
 app.use("/chef",ChefRoutes);
 app.use("/booking",BookingRoutes);

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
