import {Tweet} from "../models/tweetSchema.js"
import { User } from "../models/userSchema.js";


export const createTweet = async (req, res) => {
    try {
        const { description, id} = req.body;
        if(!description || !id) {
            return res.status(401).json({
                message: "Fields are required.",
                success: false
            });
        };
        const user = await User.findById(id).select("-password");
        await Tweet.create({
            description,
            userId:id,
            userDetails:user
        });
        return res.status(201).json({
            message: "Tweet created successfully.",
            success:true,
        })
    } catch(error){
        console.log(error);
    }
}

export const deleteTweet = async (req,res) => {
    try {
        const {id} = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Tweet deleted successfully.",
            success:true
        })
    } catch(error){
        console.log(error);
    }
}