import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { PageContext } from '../context/PageContext'
import { FaBell, FaSearch } from 'react-icons/fa'
import Image from 'next/image'
import { UilBell , UilSearch, UilBars, UilShoppingBag, UilInvoice, UilUser, UilTimes, UilAngleRightB, UilAngleLeftB, UilHeartAlt, UilTrashAlt} from '@iconscout/react-unicons'
import JSXStyle from 'styled-jsx/style'
import Link from 'next/link'
import { useRouter } from 'next/router'



const TopNav = ({cartData}:any) => {
     const { navbar, setNavbar, cartNumber }:any = useContext(PageContext)
     const[cartDrop, setCartDrop]=useState(false)
     const [amount ,setAmount]=useState()

     const [cartInfo , setCartInfo]= useState()
     const [searcBar ,setSearcBar]=useState(false)
     const [searchTerm, setSearchTerm]=useState("")

     const router=useRouter()

     const ChangeAmount= (id:string)=>{
          fetch(`http://${process.env.HOST}:8000/costumer/cart/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive'
  },
  body: JSON.stringify({
     "amount":amount
  })
});

   router.replace(router.asPath)
  
     }
//@ts-ignore
     const incrementAmount= (id, increment_decrement)=>{
          fetch(`http://${process.env.HOST}:8000/costumer/cart/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive'
  },
  body: JSON.stringify({
     "increment_decrement":increment_decrement
  })
});

   router.replace(router.asPath)
  
     }

     const deleteItem= (id:string )=>{
          fetch(`http://${process.env.HOST}:8000/costumer/cart/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive'
  },

});

   router.replace(router.asPath)
  
     }
     

     const searchStore=(e:any)=>{
          e.preventDefault()
          if(e.keyCode==13){
               router.push(`/lisitings/?search=${searchTerm}`)
          }
          
     }

     function capitalizeFirstLetter(str:string) {
          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }


     const gotCategory=(category:any)=>{
          let newString = capitalizeFirstLetter(category)
        

          router.push(`/lisitings?category=${newString}`)
  
     }

    

  return (
     <div>  
          <div className='fixed z-50 flex items-center justify-between w-full pl-4 mb-8 bg-white h-14 lg:hidden' >

          
      
               <div className='flex items-center mr-4 lg:hidden'>
                    <button className='mr-1' onClick={()=>setNavbar(!navbar)}><UilBars/></button>
               </div>
               <Link href={"/"}>
                    

               <p className='text-2xl font-extrabold justify-self-center'>Fit Gears</p>

</Link>



               <div className='flex space-x-2'>
               <input type='search' className={`px-4 border-2 rounded-md outline-none   border-black/50 scale-0 ${searcBar?"scale-100":"hidden"} duration-500`} value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} onKeyUp={searchStore}/>
                    <UilSearch onClick={()=>setSearcBar(!searcBar)}/>
                    <Link href={"/login"}> <UilUser/></Link>
                  
                    <UilShoppingBag onClick={()=>setCartDrop(!cartDrop)} className="hover:cursor-pointer "/>  
                    <div className={`flex items-center justify-center w-2 h-2 p-2 -translate-x-5 translate-y-3 rounded-full bg-brand hover:cursor-pointer`} onClick={()=>setCartDrop(!cartDrop)}>
                            <p className='text-sm text-white animate-pulse'>{cartData.amount}</p>
                          
                    </div>
               </div>

                   
          

               
               
              
            
                </div>
                <div className='z-50 items-center hidden w-screen px-8 bg-white border-b h-14 lg:flex lg:fixed'>
                <Link href={"/"}>
                    <p className='text-2xl font-extrabold'>Fit Gears</p>
                    </Link>

                  <div className='flex pr-4 ml-16 space-x-4 pl-80'>

                    <div className='flex-col items-center justify-center py-4 group hover:cursor-pointer'>
                         <Link href={"/"}>
                         <p className='text-sm font-bold duration-500 group-hover:text-brand'>HOME</p>
                         <div className='w-full h-1 duration-500 scale-0 rounded-full bg-brand group-hover:scale-100'></div>
                        </Link>
                         </div>
                    <div className='flex-col items-center justify-center py-4 group hover:cursor-pointer'>
                         <Link href={"/lisitings"} >
                         <p className='text-sm font-bold duration-500 group-hover:text-brand'>LISTINGS</p>
                         <div className='w-full h-1 duration-500 scale-0 rounded-full bg-brand group-hover:scale-100'></div>
                         </Link>
                         
                         </div>
                    <div className='flex-col items-center justify-center py-4 group hover:cursor-pointer' onClick={(e)=>gotCategory(e.target.textContent)}>
                       
                         <p className='text-sm font-bold duration-500 group-hover:text-brand'>ACCESSORIES</p>
                         <div className='w-full h-1 duration-500 scale-0 rounded-full bg-brand group-hover:scale-100'></div>
                  
                         
                         </div>
                    <div className='flex-col items-center justify-center py-4 group hover:cursor-pointer' onClick={(e)=>gotCategory(e.target.textContent)}>
                 
                         <p className='text-sm font-bold duration-500 group-hover:text-brand'>JEWELRY</p>
                         <div className='w-full h-1 duration-500 scale-0 rounded-full bg-brand group-hover:scale-100'></div>
                 
                         
                         </div>
                    <div className='flex-col items-center justify-center py-4 group hover:cursor-pointer' onClick={(e)=>gotCategory(e.target.textContent)}>
                  
                         <p className='text-sm font-bold duration-500 group-hover:text-brand'>ACTIVEWEAR</p>
                         <div className='w-full h-1 duration-500 scale-0 rounded-full bg-brand group-hover:scale-100'></div>
                    
                         
                         </div>
                  
                    
                
                  
                </div>
               

               <div className='absolute flex space-x-2 right-4'>
                    <input type='search' className={`px-4 border-2 rounded-md outline-none border-black/50 scale-0 ${searcBar?"scale-100":""} duration-500`} value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} onKeyUp={searchStore}/>
                    <UilSearch onClick={()=>setSearcBar(!searcBar)}/>
                    <Link href={"/login"}> <UilUser/></Link>
                  
                    <UilHeartAlt/>
                    <UilShoppingBag onClick={()=>setCartDrop(!cartDrop)} onMouseEnter={()=>setCartDrop(true)}  className="hover:cursor-pointer "/>  
                    <div className="flex items-center justify-center w-2 h-2 p-2 -translate-x-5 translate-y-3 rounded-full bg-brand hover:cursor-pointer" onClick={()=>setCartDrop(!cartDrop)}>
                            <p className='text-sm text-white animate-pulse'>{cartData.amount }</p>
                          
                    </div>
                    
                    
  
               </div>

            
                    
                </div>
               
                <div className={`translate-y-[3.6rem]  z-50 lg:translate-y-14 bg-white w-80 fixed right-4 lg:right-8 h-80  lg:h-[40vh] px-4 py-4 rounded-md shadow-xl ${cartDrop?"":"hidden"} overflow-scroll`} onMouseLeave={()=>setCartDrop(false)}>
                    <p className=''>Shopping Cart</p>
                    {cartData.products? cartData.products.map((e,i)=>(
                         <div key={i} className='flex pb-4 mt-4 border-b group'>

                              <Link href={`/lisitings/${e.product_id}`} >
                              <Image src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+e.image} height={100} width={100} alt="" className='h-24'/>
                              </Link>
                              <div className='flex flex-col justify-between h-24 ml-4'>
                                   <p  className='w-20 text-xs group-hover:text-brand'>{e.item.product_name.length>30?String(e.item.product_name).substring(0,21)+"...":e.item.product_name}</p>
                                   <div className='flex'>    
                                   <div className='flex items-center justify-center w-5 h-6 border border-r-0 rounded-l-full hover:cursor-pointer' onClick={()=>incrementAmount(e.item.id, -1)}>
                                        <UilAngleLeftB/>
                                        </div>   
                                   <input className='w-10 h-6 px-3 border hover:cursor-pointer' placeholder={e.item.quantity} onChange={(e)=>setAmount(e.target.value)} onBlur={()=>ChangeAmount(e.item.id)}/>
                                   <div className='flex items-center justify-center w-5 h-6 border border-l-0 rounded-r-full hover:cursor-pointer' onClick={()=>incrementAmount(e.item.id, 1)}>
                                   <UilAngleRightB/>
                                        </div>  
                                   </div>
                                   <div className="flex items-center space-x-2">
                                        <p className='text-sm font-thin'>{e.item.quantity} x</p>
                                        <p className='font-bold text-brand'>${e.item.price}</p>
                                   </div>
                              </div>


                              <UilTrashAlt className="ml-16 hover:text-brand hover:cursor-pointer active:text-red-500" onClick={()=>deleteItem(e.item.id)}/>

                         </div>
                    )):<div>NO Items</div>}
                    <p className='text-lg font-bold'>Total: ${cartData.total}</p>
                    <div className="flex-col w-full p-4 space-y-4"></div>

                    <button className={`flex items-center justify-center w-full h-10 text-white bg-brand ${cartData.amount==0?"hidden":""}`}>
                    <Link href={"/shipping"}>  PROCEED TO CHECKOUT </Link>
                        </button>
                    <button className={`flex items-center justify-center w-full h-10 mt-4 group ${cartData.amount==0?"hidden":""} `}>
                         <Link href={"/cart"}>  
                         <div className='flex-col items-center justify-center '>
                              <p>View Cart</p>
                              <div className='bg-black w-20  scale-0 group-hover:scale-100  h-0.5 duration-700 '></div>
                         </div>
                         </Link>
                       
                    </button>
                    <div className={`flex items-center justify-center w-ful  ${cartData.amount>0?"hidden":""}`}>
                              <p>NO ITEMS</p>
               
                         </div>
                    
                </div>
                
                </div>
   
  )
}

export default TopNav


