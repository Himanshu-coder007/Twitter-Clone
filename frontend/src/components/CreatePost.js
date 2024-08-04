import React from "react";
import Avatar from "react-avatar"
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import { getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const {user} = useSelector(store=>store.user);
  const dispatch = useDispatch();


  const submitHandler = async()=>{
    try {
      const res = await axios.post(`${TWEET_API_END_POINT}/create`,{description, id:user?._id },{
        headers:{
          "Content-Type" : "application/json"
        },
        withCredentials:true,
      });
      dispatch(getRefresh());
      if(res.data.success){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setDescription("");
  }
  return (
    <div className="w-[100%]">
      <div>
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
            <h1 className="font-semibold text-gray-600 text-lg">For You</h1>
          </div>
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
            <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <div>
              <Avatar
                src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
                size="40"
                round={true}
              />
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none border-none text-xl ml-2"
              type="text"
              placeholder="What is happening?!"
            />
          </div>
          <div className="flex justify-between p-4 border-b border-gray-300">
            <div className="my-2">
              <FaImage size="24px" />
            </div>
            <button
              onClick={submitHandler}
              className="bg-[#1A8CD8] px-4 py-1 text-lg text-white rounded-full"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
