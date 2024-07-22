import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path:"../config/.env"
})
const databseConnection = () => {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connnected to mongoDB");
    }).catch((error)=>{
        console.log(error);
    })
}
export default databseConnection;