import React, { useState } from 'react'
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaHeart } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Link, useNavigate} from 'react-router-dom';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const Navigate = useNavigate()
    const handilSignin = ()=>{
        Navigate('/signin')

    }
    
  return (
    <div className='bg-black text-white'>
        <div className='py-3 px-3 max-w-[1490px] mx-auto flex items-center justify-between gap-1 lg:gap-3'>
            <Link to="/"><a className='text-lg font-semibold'>Shop Website</a></Link>
            <div className='hidden sm:flex gap-9 text-base'>
                <Link to="/" className='hover:underline'><a>Home</a></Link>
                <a>All Categories</a>
                <a>Mens</a>
                <a>Womens</a>
                <a>Kids</a>
                <a>Brands</a>
                {/* <Link to="/add"><a>Add Products</a></Link> */}
            </div>
            <div className='w-48 lg:w-80 rounded text-black relative'>
            <input type="text" placeholder='Search...' className='w-full px-2 py-[2px] rounded outline-none' />
            <FaSearch className='absolute top-2 right-2' />
            </div>
            <div className='flex items-center gap-3  text-lg'>
                <div>
                <FaHeart />
                </div>
                <div className='relative'>
                <FaShoppingCart />
                <span className='absolute -top-4 -right-3 text-red-500'>0</span>
                </div>
            <div className='flex items-center relative'>
                <span className='ml-1 mr-2 font-semibold text-lg '></span>
            <FaUser onClick={handilSignin} className='cursor-pointer' />
            </div>
            </div>
            <div onClick={()=>setMenu(!menu)} className='sm:hidden text-lg'>
            <FaBars />
            </div>
            {menu &&<div className='absolute top-0 bottom-0 left-0 z-10 w-64 h-screen bg-black'>
                <div className='flex-col px-3 pt-2 text-lg font-medium'>
                    <Link className='block pb-1' to="/">Home</Link>
                    <Link className='block pb-1'>All Categories</Link>
                    <Link className='block pb-1'>Mens</Link>
                    <Link className='block pb-1'>Womens</Link>
                    <Link className='block'>Brands</Link>
                </div>
                <FaXmark onClick={()=>setMenu(false)} className='text-2xl absolute top-3 right-2' />
            </div>}
        </div>
    </div>
  )
}

export default Navbar


