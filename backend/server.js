// console.log("server is running.")
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config(); //read the value of process.env.MONGO_URI
const app = express();
const PORT = process.env.PORT || 5000; //5000 is the default port number

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
