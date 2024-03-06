import React from 'react';
import { useContext , useEffect, useState } from 'react';
import { PageContext } from '../context/PageContext';
import Link from 'next/link';
import {useRouter} from 'next/router';
// @ts-ignore
import {  UilUser, UilTimes, UilAngleRightB, UilPadlock,UilShoppingBasket,UilHeartAlt} from '@iconscout/react-unicons'



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
     function capitalizeFirstLetter(str:string) {
          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }


     const gotCategory=(category:any)=>{
          let newString = capitalizeFirstLetter(category)
        

          router.push(`/lisitings?category=${newString}`)
          setNavbar(false)
  
     }


  return (
     <div className={`flex ${navbar?"w-40 absolute lg:w-[25vw]":" -translate-x-full "}  duration-500 fixed z-50`}>  
     <div className={`fixed w-[60vw] h-screen bg-white z-50 ${navbar?"block":" hidden "} pt-8 `}>
          <button className='flex ml-2 font-light text-neutral-500 hover:text-brand group' onClick={()=>setNavbar(false)}> <div className="mr-1 text-slate-300 group-hover:text-brand"><UilTimes/> </div>  Close</button>
          <div className='flex-col px-4 pb-10 mt-4 space-y-4 border-b'>
               <div>
               <Link href={'/'}>
                    <div className='flex items-center justify-between text-xl group' onClick={()=>setNavbar(false)}>
                         <p className='font-bold group-hover:text-brand'>HOME</p>
                     
                         <UilAngleRightB className="text-slate-300"/>
                    </div>
               </Link>
               </div>
               
               <div>
               <Link href={'/lisitings'}>
                    <div className='flex items-center justify-between text-xl group' onClick={()=>setNavbar(false)}>
                         <p className='font-bold group-hover:text-brand'>LISTINGS</p>
                     
                         <UilAngleRightB className="text-slate-300"/>
                    </div>
               </Link>
               </div>
               
               <div>
               
                    <div className='flex items-center justify-between text-xl group' onClick={(e:any)=>gotCategory(e.target.textContent)} >
                         <p className='font-bold group-hover:text-brand'>ACCESSORIES</p>
                     
                         <UilAngleRightB className="text-slate-300"/>
                    </div>
         
               </div>
               
               <div>
              
                    <div className='flex items-center justify-between text-xl group' onClick={(e:any)=>gotCategory(e.target.textContent)}>
                         <p className='font-bold group-hover:text-brand'>JEWELRY</p>
                     
                         <UilAngleRightB className="text-slate-300"/>
                    </div>
           
               </div>
               
               <div>
              
                    <div className='flex items-center justify-between text-xl group' onClick={(e:any)=>gotCategory(e.target.textContent)}>
                         <p className='font-bold group-hover:text-brand'>ACTIVEWEAR</p>
                     
                         <UilAngleRightB className="text-slate-300"/>
                    </div>
            
               </div>
               
          </div>

          <div className='flex-col px-4 py-10'>
               <p className='text-xl font-bold '>My Account</p>
               <div className="flex-col mt-4 space-y-2">
                    <div className='flex items-center font-thin group hover:cursor-pointer'>
                         <Link href={"/login"}>
                         <div className='flex items-center'>
                         <UilPadlock/>
                         <p className='ml-1 text-md text-slate-500'>Sign In</p>
                         </div>
                         </Link>
                    </div>
                    <div className='flex items-center font-thin group hover:cursor-pointer'>
                         <Link href={"/login"}>
                         <div className='flex items-center'>
                         <UilUser/>
                         <p className='ml-1 text-md text-slate-500'>Resgister</p>
                         </div>
                         </Link>
                    </div>
                    <div className='flex font-thin group hover:cursor-pointer'>
                         <Link href={"/shipping"}>
                              <div className='flex items-center'>
                         <UilShoppingBasket/>
                         <p className='ml-1 text-md text-slate-500'>View Cart</p>
                      </div>
                         </Link>
                    </div>
                    <div className='flex items-center font-thin group hover:cursor-pointer'>
                         <Link href={"#"}>
                         <div className='flex items-center group-hover:text-brand'>
                         <UilHeartAlt/>
                         <p className='ml-1 text-md text-slate-500 group-hover:text-brand'>Wishlist</p>
                         </div>
                         </Link>
                    </div>
                    
                    
               </div>
               
          </div>
     </div>
      
    <div className={`fixed top-0 right-0 w-[40vw] h-full overflow-hidden bg-gray-900 opacity-75 z-50 lg:hidden ${navbar?"block":" hidden scale-0 "} duration-500 hover:cursor-pointer scor`} onClick={()=>setNavbar(false)}></div>
    
    </div>

  )
}

export default Navbar