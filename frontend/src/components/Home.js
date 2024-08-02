import React from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useOtherUsers from '../hooks/useOtherUser';



const Home = () => {
  //custom hook
  const {user,otherUsers} = useSelector(store=>store.user);
  useOtherUsers(user?._id);
  
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftSidebar />
      <Outlet/>
      <RightSidebar otherUsers={otherUsers}/>
    </div>
  );
}

export default Home