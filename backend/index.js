import express from "express";
import dotenv from "dotenv";
import databseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
const app = express();
dotenv.config();
databseConnection();
import cors from "cors";

// middlewares
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

//api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/tweet",tweetRoute);

app.get("/home",(req,res)=>{
  res.status(200).json({
    Message:"Coming from backend..."
  })
});

app.listen(process.env.PORT, () => {
  console.log(`Server listen at port ${process.env.PORT}`);
});
