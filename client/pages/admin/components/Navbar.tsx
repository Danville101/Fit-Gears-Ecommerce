import React from 'react';
import { useContext , useEffect, useState } from 'react';
import { PageContext } from '../context/PageContext';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { FaArrowRight, FaCaretRight, FaChevronRight, FaClipboard, FaMoneyBill, FaStore, FaStoreAlt, FaTshirt } from "react-icons/fa";
// @ts-ignore
import { UilClipboardAlt,UilEstate , UilShoppingBag, UilInvoice,UilAngleRightB, UilUser} from '@iconscout/react-unicons'



const Navbar = () => {
     const token = '>'
     const router = useRouter();
   //  const {page, setPage} = useContext(PageContext)
     const { navbar, setNavbar }:any = useContext(PageContext)
     const [page,setPage]=useState("")

     const setDashboard =()=>{
          setPage("Dashboard");
          setNavbar(false);
     }

     const setProducts=()=>{
          setPage("Product");
          setNavbar(false);
     }

     useEffect(()=>{
     const {pathname} = router; 

     switch(pathname){
          case "/admin/products":
               setPage("Product")
               break;
          case "/admin/dashboard":
               setPage("Dashboard")
               break;
          case "/admin/order":
               setPage("Order")
               break;
     }

     },[router])

     const [orderDrop, setOrderDrop]= useState(false)


  return (
     <div className={`flex ${navbar?"w-40 absolute lg:w-[25vw]":" w-0 lg:w-full "}  duration-500`}>   
          
           <div className={` bg-gradient-to-br from-[#3D9171] to-[#249384] h-screen lg:w-full text-white pl-4 pt-4 pr-4 ${navbar?"lg:w-[25vw]":""}  lg:block  overflow-hidden `}>
     <div className='flex items-center justify-between ml-2'> <h1 className='text-3xl'>Fit Gears.</h1> <div className='hidden pr-2 lg:block'><FaStoreAlt className='inline-flex text-3xl'/></div> <div className='rotate-180 lg:hidden' onClick={()=>setNavbar(!navbar)}><UilAngleRightB/></div>
     </div>
     <div className='flex flex-col justify-between mt-8 h-72'>
          <Link href="/admin/dashboard">
          <div className={`flex py-3 pl-2 items-center rounded-md hover:bg-white/20 ${page==="Dashboard"?"bg-white/20":""} duration-500 hover:cursor-pointer `} onClick={()=>setNavbar(false)} >
               <div> <UilEstate className='text' /></div>
               
                  <p className="ml-2 text-lg">Dashboard</p>
               
            
          </div>
</Link>
          <Link href="/admin/products">
          <div className={`flex justify-between items-center py-3 pl-2 pr-2 duration-500 rounded-md hover:bg-white/20 hover:cursor-pointer ${page==="Product"? "bg-white/20":""}`} onClick={()=>setNavbar(false)}>
               <div className='flex'>   <div><UilShoppingBag className='inline-flex'/></div>
               <p className="ml-2 text-lg">Product</p>
               </div>
            
               <div> <FaChevronRight /> </div>
          </div>
</Link>
          <Link href="/admin/order">
               <div className='group'>
          <div className={`flex group justify-between items-center py-3 pl-2 pr-2 duration-500 rounded-md hover:bg-white/20 hover:cursor-pointer ${page==="Order" && "bg-white/20"}`} onClick={()=>setNavbar(false)} >
               <div className='flex'>   <div><UilInvoice className='inline-flex'/></div>
               <p className="ml-2 text-lg">Orders</p>
               </div>
            
               <div> <FaChevronRight/> </div>
          </div>
        
          </div>
</Link>
          <Link href="/admin/order">
               <div className='group'>
          <div className={`flex group justify-between items-center py-3 pl-2 pr-2 duration-500 rounded-md hover:bg-white/20 hover:cursor-pointer ${page==="Order" && "bg-white/20"}`} onClick={()=>setNavbar(false)} >
               <div className='flex'>   <div><UilUser className='inline-flex'/></div>
               <p className="ml-2 text-lg">Costumers</p>
               </div>
            
               <div> <FaChevronRight/> </div>
          </div>
        
          </div>
</Link>

        
          
     </div>

    </div>
    <div className={`fixed top-0 w-full h-full overflow-hidden bg-gray-900 opacity-75 z-50 lg:hidden left-[9.2rem] ${navbar?"block":" hidden "} duration-500 hover:cursor-pointer`} onClick={()=>setNavbar(false)}></div>
    
    </div>

  )
}

export default Navbar