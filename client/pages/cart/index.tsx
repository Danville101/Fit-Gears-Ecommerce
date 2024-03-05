import React from 'react'
import Layout from '../layout/Layout'
import Link from 'next/link'
//@ts-ignore
import { UilShop, UilAngleLeftB, UilTrashAlt , UilAngleRightB} from '@iconscout/react-unicons'
import Image from 'next/image'
import { PageContext } from '../context/PageContext'

import { useState, useContext } from 'react'
import { useRouter } from 'next/router'

const Cart = ({cartData}:any) => {


     const { navbar, setNavbar, cartNumber }:any = useContext(PageContext)
     const[cartDrop, setCartDrop]=useState(false)
     const [amount ,setAmount]=useState<string>()

     const [cartInfo , setCartInfo]= useState()

     const router=useRouter()

     const ChangeAmount= (id)=>{
          fetch(`http://127.0.0.1:8000/costumer/cart/${id}`, {
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
          fetch(`http://127.0.0.1:8000/costumer/cart/${id}`, {
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

     const deleteItem= (id:number )=>{
          fetch(`http://127.0.0.1:8000/costumer/cart/${id}`, {
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
     

     
  return (
     <Layout cartData={cartData}>
          <div className='flex flex-col px-4 py-4 lg:space-x-4 lg:px-20 lg:flex-row lg:justify-center '>
               <div className="flex-col space-y-2 ">
                    <div className="w-full h-auto px-4 py-4 bg-white rounded-sm shadow-lg lg:w-[40vw]">
                         <p className="text-xl font-bold">Item Summary{cartData.amount}</p>
                         <div className="flex mt-4">
                              <div className="flex space-x-2">   <input type='checkbox' className='accent-black'/>
                              <p>All</p>
                              </div>
                           
                         </div>
                    </div>


                    <div className="w-full h-auto px-4 py-4 bg-white rounded-sm shadow-lg">
                    <Link href={"/"}>
                         <div className='flex space-x-2'>
                               <UilShop/>
                         <p className="text-lg font-bold">Fit Gears</p>
                         </div>
                 
                         </Link >
                         <div className="flex mt-4">
                              <div className="flex flex-col w-full space-x-2">  
                              {cartData.products? cartData.products.map((e,i)=>(
                         <div key={i} className='flex justify-between w-full pb-4 mt-4 border-b group'>

                              <Link href={`/lisitings/${e.product_id}`} >
                              <Image src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+e.image} height={100} width={100} alt="" className='h-24'/>
                              </Link>
                              <div className='flex justify-between h-24 ml-4'>
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
                    )):<div>NO ITEMS</div>}
                              </div>
                           
                         </div>
                         
                    </div>
                   
               </div>
               
               <div className="flex flex-col w-full px-4 py-4 mt-1 bg-white rounded-sm shadow-lg h-52 lg:w-1/5">
                         <p className="text-xl font-bold">Order Summary</p>
                         <div className="flex mt-4">
                              <div className="flex justify-between w-full">
                                   <p>Subtotal</p>
                                   <p className='text-2xl font-bold'>USD${cartData.total}</p>
                              </div>
                           
                         </div>
                         <Link href={"/checkout-login"}>
                       
                         <button className='flex items-center justify-center w-full py-4 mt-4 text-xl font-bold text-white bg-black'>Checkout Now</button>
                   </Link>
                    </div>
          </div>

     </Layout>
  )
}

export default Cart



export async function getServerSideProps (context){
     const headers = context.req.headers;
     const userAgent = headers['user-agent'];
   
  
   
   
     
     const res2 = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/costumer/cart/`,{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent':userAgent
           
          },
       credentials: "include",
     })
   
     const  cartData= await res2.json()
   
   
   
   
   
     
     return{props:{  cartData }}
     
   
   }
   
   
   
   