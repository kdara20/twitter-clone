// console.log("server is running.")
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config(); //read the value of process.env.MONGO_URI
const app = express();
const PORT = process.env.PORT || 5000; //5000 is the default port number

//Middleware-function 
app.use(express.json());  //to parse req.body -> user.model.js
app.use(express.urlencoded({ extended: true })) // to parse form data (urlencoded) with postman
app.use(cookieParser()); //to parse the cookie
//1st part using get method
// app.get("/", (req, res) => {
//   res.send("server is running.");
// });

//2nd demo of dotenv
// console.log(process.env.MONGO_URI); //undefined without importing dotenv

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  // 5000 is the port number
  console.log(`server is running on port ${PORT}`);
  connectMongoDB(); //connect to mongoDB
});
