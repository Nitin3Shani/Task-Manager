import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-between bg-[#E62727]  text-white py-3 mb-5'>
    <div className='logo cursor-pointer'>
        <span className='font-semibold text-lg mx-8 hover:font-extrabold '>Task Planner</span>
    </div>
    <ul className='flex gap-14 mx-8 text-lg font-semibold'>
     <li className='cursor-pointer hover:font-extrabold  '>Home</li>
     <li className='cursor-pointer hover:font-extrabold  '>YourTasks</li>
    </ul>
   </nav>
  )
}

export default Navbar