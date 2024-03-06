import React from 'react'
import { useContext } from 'react'
import { PageContext } from '../context/PageContext'
import { FaBell, FaSearch } from 'react-icons/fa'
//@ts-ignore
import { UilBell , UilSearch, UilBars} from '@iconscout/react-unicons'
const TopNav = () => {
     const { navbar, setNavbar }:any = useContext(PageContext)
  return (
     <div className='flex items-center justify-between w-full h-20 pl-4 mb-8 bg-white ' >

               <div className='flex items-center justify-center mr-4 lg:hidden'>
                    <button className='mr-1' onClick={()=>setNavbar(!navbar)}><UilBars/></button>
                    <p>Fit Gears.</p>
                    <div className='w-[0.04rem] h-5 bg-black ml-2'></div>
               </div>


               
               <form className='hidden md:block'>
    
               </form>

               
               <div className='flex items-center mr-4 space-x-2'>
                    <p className='text-2xl'><UilBell className="" /></p>
                    <div className='w-6 h-6 rounded-full bg-slate-500 group'>
                         <div className='w-[94vw] ml-4 h-20  z-50 absolute bg-white right-4 top-16 rounded-md opacity-0 group-hover:opacity-100 duration-1000 px-4 shadow-2xl border hidden'>
                              <p>Log out</p>
                         </div>
                    </div>
                     
               </div>
              
            
                </div>
  )
}

export default TopNav