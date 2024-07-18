import React from "react";
import { CiSearch } from "react-icons/ci";

const RightSidebar = () => {
  return (
    <div className="w-[25%]">
        <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none w-full">
          <CiSearch size={"20px"}/>
          <input type="text" className="bg-transparent outline-none px-2" placeholder="Search"/>
        </div>
        <div className="p-4 bg-gray-100 rounded-2xl my-4">
          <h1 className="font-bold text-lg">Who to follow</h1>
          {}
        </div>
    </div>
  )
};

export default RightSidebar;
