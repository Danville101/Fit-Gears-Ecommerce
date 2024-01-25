import React from 'react'
import Layout from '../layout/Layout'
import Link from 'next/link'
import { UilShop, UilAngleLeftB, UilTrashAlt , UilAngleRightB} from '@iconscout/react-unicons'
import Image from 'next/image'
import { PageContext } from '../context/PageContext'

import { useState, useContext } from 'react'
import { useRouter } from 'next/router'

const Cart = ({cartData}) => {


     const router=useRouter()

     const [email,setEmail]=useState()
     const [password,setPassword]=useState()


     const loginFunc =(e:any)=>{
          e.preventDefault()

          fetch('http://127.0.0.1:8000/login/', {
               method: 'POST',
               mode: 'cors',
               headers: {
                'Accept': 'application/json',
                 'Content-Type': 'application/json'
                 
               },

               
               body: JSON.stringify({
                 email: email,
                 password: password
               }),credentials: "include",
               
             })
             .then(response => {
               // response.status, response.statusText, response.headers will not be available 
               if (response.status == 200){
                router.push("/shipping")               
               }

               return response.text();
             }).catch((err)=>{
               alert(`Please Login ${err}`)
               
             })
             
     }

     
  return (
     <Layout cartData={cartData}>
         <div className='flex flex-col '>
          <div className='flex items-center justify-center w-full h-20 border'>
               <div className='flex items-center justify-center w-auto h-20 border-b-2 border-black '><p className='text-2xl font-bold '>CHECKOUT LOG IN</p></div>
          </div>
          <div className='flex flex-col lg:flex lg:flex-row lg:justify-center lg:items-center lg:space-x-4'>
               
         
          <div className='flex flex-col pb-8 mt-8 border-b-2 lg:border-2 lg:pt-8'>
               <div className='pl-4 border-b-2 border-black w-fit'>
                    <p className='font-bold'>GUEST CHECKOUT</p>
               </div>
               <div className='w-full px-4 mt-4'>
                    <form>
                            <p className='font-light'>EMAIL</p>
                            <div className='flex flex-col space-y-4'>
                            <input className='w-full h-10 pl-4 border outline-none'/>
                            <p className='text-sm'>Checkout quickly as a guest (you can choose to create an account later if you wish).</p>
                          
                            <input className='w-full h-10 pl-4 text-white bg-black border outline-none' type='submit' value={"COUNTINUE AS GUEST"}/>
                  </div>
                    </form>
              
                    
                    
               </div>
          </div>

          <div className='flex flex-col pb-8 mt-8 border-b-2 lg:border-2 lg:w-[20vw] lg:pt-8'>
               <div className='pl-4 border-b-2 border-black w-fit '>
                    <p className='font-bold '>LOG IN</p>
               </div>
               <div className='w-full px-4 mt-4'>
                    <form onSubmit={loginFunc} >
                          
                            <div className='flex flex-col space-y-4'>
                
                            <div>
                            <p className='font-light'>EMAIL</p>
                            <input className='w-full h-10 pl-4 border outline-none' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div>
                            <p className='font-light'>PASSWORD</p>
                            <input className='w-full h-10 pl-4 border outline-none' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>

                          
                            <input className='w-full h-10 pl-4 text-white bg-black border outline-none' type='submit' value={"LOG IN SECURELY"}/>
                  </div>
                    </form>
              
                    
                    
               </div>
          </div>
           </div>
         </div>
     </Layout>
  )
}

export default Cart



export async function getServerSideProps (context){
     const headers = context.req.headers;
     const userAgent = headers['user-agent'];
   
  
   
   
     
     const res2 = await fetch("http://127.0.0.1:8000/costumer/cart/",{
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
   
   
   
   