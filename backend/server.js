// console.log("server is running.")
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import PostRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config(); //read the value of process.env.MONGO_URI
// Connect to cloudinary account, using to upload images

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000; //5000 is the default port number

//Middleware-function 
app.use(express.json());  //to parse req.body -> user.model.js
app.use(express.urlencoded({ extended: true })) // to parse form data (urlencoded) with postman
app.use(cookieParser()); //to parse the cookie

app.use("/api/auth", authRoutes); //middleware
app.use("/api/users", userRoutes); //middleware
app.use("/api/posts", PostRoutes); //middleware
app.use("/api/notifications", notificationRoutes);

//1st part using get method
// app.get("/", (req, res) => {
//   res.send("server is running.");
// });

//2nd demo of dotenv
// console.log(process.env.MONGO_URI); //undefined without importing dotenv



app.listen(PORT, () => {
  // 5000 is the port number
  console.log(`server is running on port ${PORT}`);
  connectMongoDB(); //connect to mongoDB
});
