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
};




export const likeOrDislike = async (req,res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            //dislike
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User disliked your tweet."
            })
        } else{
            //like
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message: "User liked your tweet."
            })
        }
    } catch(error) {
        console.log(error);
    }
};

// export const getAllTweets = async (req, res) => {
//     //loggedInUser's tweet + following user tweet
//     try {
//         const id = req.params.id;
//         const loggedInUser = await User.findById(id);
//         const loggedInUserTweets = await Tweet.findByIdAndUpdate({userId:id});
//         const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
//             return Tweet.findByIdAndUpdate({userId:otherUsersId});
//         }));
//         return res.status(200).json({
//             tweets:loggedInUserTweets.concat(...followingUserTweet),
//         })
//     } catch(error){
//         console.log(error);
//     }
// }

export const getAllTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    if (!loggedInUser) {
      return res.status(404).json({
        message: "Logged in user not found",
        success: false,
      });
    }

    // Find all tweets by the logged-in user
    const loggedInUserTweets = await Tweet.find({ userId: id });

    // Find all tweets by the users that the logged-in user is following
    const followingUserTweets = await Promise.all(
      loggedInUser.following.map(async (otherUserId) => {
        return Tweet.find({ userId: otherUserId });
      })
    );

    // Flatten the array of tweets from following users
    const allFollowingTweets = followingUserTweets.flat();

    // Combine the logged-in user's tweets with those from following users
    const allTweets = loggedInUserTweets.concat(allFollowingTweets);

    return res.status(200).json({
      tweets: allTweets,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred",
      success: false,
    });
  }
};


// export const getFollowingTweets = async (req,res) =>{
//   try {
//     const id = req.params.id;
//     const loggedInUser = await User.findById(id);
//     const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUserId)=>{
//       return Tweet.findById({userId: otherUserId});
//     }));
//     return res.status(200).json({
//       tweets:[].concaat(...followingUserTweet)
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);

    if (!loggedInUser) {
      return res.status(404).json({
        message: "Logged in user not found",
        success: false,
      });
    }

    const followingUserTweets = await Promise.all(
      loggedInUser.following.map(async (otherUserId) => {
        return Tweet.find({ userId: otherUserId });
      })
    );

    // Flatten the array of tweets from following users
    const allFollowingTweets = followingUserTweets.flat();

    return res.status(200).json({
      tweets: allFollowingTweets,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred",
      success: false,
    });
  }
};
