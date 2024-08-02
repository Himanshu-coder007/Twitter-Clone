import React from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

import { Outlet } from 'react-router-dom';



const Home = () => {
  
  
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftSidebar />
      <Outlet/>
      <RightSidebar />
    </div>
  );
}

export default Home