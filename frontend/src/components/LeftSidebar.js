import React from "react";
import { IoIosHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { BsBookmarkFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { Link,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";
 


const LeftSidebar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[20%]">
      <div>
        <div>
          <img
            className="ml-4"
            width={"24px"}
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
            alt="twitter logo"
          ></img>
        </div>
        <div className="my-4">
          <Link to="/" className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <IoIosHome size={"24px"} />
            </div>
            <h1 className="font-bold text-lg ml-2">Home</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <FaSearch size={"24px"} />
            </div>
            <h1 className="font-bold text-lg ml-2">Explore</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <IoIosNotifications size={"24px"} />
            </div>
            <h1 className="font-bold text-lg ml-2">Notification</h1>
          </div>
          <Link to={`/profile/${user?._id}`} className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <IoMdPerson size={"24px"} />
            </div>
            <h1 className="font-bold text-lg ml-2">Profile</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <BsBookmarkFill size={"24px"} />
            </div>
            <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <IoLogOut size={"24px"} />
            </div>
            <h1 onClick={logoutHandler} className="font-bold text-lg ml-2">Logout</h1>
          </div>
          <button className="px-4 py-2 border-none text-md bg-[#1A8CD8] w-full rounded-full text-white font-bold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
