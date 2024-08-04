import React from 'react';
import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useSelector,useDispatch } from 'react-redux';
import { getRefresh } from '../redux/tweetSlice';

const Tweet = ({tweet}) => {
  const {user} = useSelector(store=>store.user);
  const dispatch = useDispatch();
  const likeOrDislike = async (id)=>{
    try {
      const res= await axios.put(`${TWEET_API_END_POINT}/like/${id}`,{id:user?._id},{
        withCredentials:true
      })
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.respoonse.data.message);
      console.log(error);
    }
  }
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
            size="40"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-1">{`@${tweet?.userDetails[0]?.username} .1m`}</p>
            </div>
            <div>
              <p>{tweet?.description}</p>
            </div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <FaRegComment size={"20px"} />
                </div>

                <p className="ml-1">0</p>
              </div>
              <div className="flex items-center">
                <div onClick={()=>likeOrDislike(tweet?._id)} className="p-2 hover:bg-pink-200 rounded-full cursor-pointer">
                  <CiHeart size={"24px"} />
                </div>

                <p className="ml-1">{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
                  <CiBookmark size={"24px"} />
                </div>

                <p className="ml-1">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet