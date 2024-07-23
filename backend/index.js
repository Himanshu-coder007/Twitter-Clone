import express from "express";
import dotenv from "dotenv";
import databseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
const app = express();
dotenv.config();
databseConnection();

// middlewares
app.use(express.urlencoded({
  extends:true
}));
app.use(express.json());
app.use(cookieParser());

//api
app.use("/api/v1/user",userRoute);
http://localhost:8080/api/v1/user/register

app.get("/home",(req,res)=>{
  res.status(200).json({
    Message:"comming from backend..."
  })
});

app.listen(process.env.PORT, () => {
  console.log(`Server listen at port ${process.env.PORT}`);
});
