import express from "express";
import dotenv from "dotenv";
import databseConnection from "./config/database.js";
const app = express();
dotenv.config();
databseConnection();

app.listen(process.env.PORT, () => {
  console.log(`Server listen at port ${process.env.PORT}`);
});
