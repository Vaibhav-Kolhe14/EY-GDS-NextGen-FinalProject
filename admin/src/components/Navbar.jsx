import React from 'react'
import { assets } from '../assets/assets'

function Navbar({setToken}) {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img src={assets.logo} className="w-[10%] min-w-[80px]" />
      <button onClick={()=>setToken('')} className='bg-gray-600 cursor-pointer text-white px-5 py-2 sm:py-2 sm:px-7 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
