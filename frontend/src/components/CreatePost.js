import React from "react";
import Avatar from "react-avatar"
import { FaImage } from "react-icons/fa";

const CreatePost = () => {
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
              className="w-full outline-none border-none text-lg ml-2"
              type="text"
              placeholder="What is happening?"
            />
          </div>
          <div className="flex justify-between p-4 border-b border-gray-300">
            <div className="my-2">
              <FaImage />
            </div>
            <button className="bg-[#1A8CD8] px-4 py-1 text-lg text-white rounded-full">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
