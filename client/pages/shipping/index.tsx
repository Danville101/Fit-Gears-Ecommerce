import React, { useEffect } from 'react'
import Layout from '../layout/Layout'
import Link from 'next/link'
import { UilShop, UilAngleLeftB, UilTrashAlt , UilAngleRightB} from '@iconscout/react-unicons'
import Image from 'next/image'
import { PageContext } from '../context/PageContext'

import { useState, useContext } from 'react'
import { useRouter } from 'next/router'


const Cart = ({cartData}) => {

     interface Item{
      price: number,
      name: string,
      quantity:number
    
      
     }

     const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };

     const [formData, setFormData] = useState({
      first_name:"",
      last_name:"",
      email:"danvil@gmaihl.com",
       address_line1:"",
       address_line2:"",
       city:"",
       country_state:"",
       postcode_zipcode:"",
        phone:""
    });

     const router=useRouter()


     const checkOut=(e)=>{
        e.preventDefault()
        fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/costumer/checkout/`,{
          "method":"POST",
          body:JSON.stringify({
            "first_name": formData.first_name,
      "last_name":formData.last_name,
      "email":formData.email,
       "address_line1":formData.address_line1,
       "address_line2":formData.address_line2,
       "city":formData.city,
       "country_state":formData.country_state,
       "postcode_zipcode":formData.postcode_zipcode,
        "phone":formData.phone,
        "items": cartData.to_send_data
          })
        }).then((response)=>{

          router.push(response.url)
        })
      
     }

     

     
  return (
    <div className='flex flex-col bg-[#F2F3F4]'>

     <div className='flex items-center justify-center w-screen h-16 bg-white'>
     <p className='text-2xl font-extrabold'>Fit Gears</p>
     </div>
     <div className='flex flex-col px-4 py-8 lg:flex lg:flex-row lg:justify-center lg:space-x-4'>
      <form className='flex flex-col mb-4 lg:w-[20vw]' onSubmit={checkOut}>  
        <p>DELIVERY INFORMATION</p>
        <div className="flex flex-col mt-4 space-y-2">
          <p className="text-sm ">FIRST NAME</p>
          <input className="w-full h-10 pl-4 border outline-none" name="first_name" type="text" value={formData.first_name} onChange={handleChange}/>
          
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          <p className="text-sm ">LAST NAME</p>
          <input className="w-full h-10 pl-4 border outline-none" name="last_name" type="text" value={formData.last_name} onChange={handleChange}/>
          
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          <p className="text-sm ">EMAIL</p>
          <input className="w-full h-10 pl-4 border outline-none" name="email" type="text" value={formData.email} onChange={handleChange}/>
          
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          <p className="text-sm ">ADDRESS LINE 1</p>
          <input className="w-full h-10 pl-4 border outline-none" name="address_line1" type="text" value={formData.address_line1} onChange={handleChange}/>
          
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          <p className="text-sm ">ADDRESS LINE 2</p>
          <input className="w-full h-10 pl-4 border outline-none" name="address_line2" type="text" value={formData.address_line2} onChange={handleChange}/>
          
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          <p className="text-sm ">CITY</p>
          <input className="w-full h-10 pl-4 border outline-none" name="city" type="text" value={formData.city} onChange={handleChange}/>
          
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          <p className="text-sm ">COUNTY </p>
          <input className="w-full h-10 pl-4 border outline-none" name="country_state" type="text" value={formData.country_state} onChange={handleChange}/>
          
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          <p className="text-sm ">POSTAL CODE</p>
          <input className="w-full h-10 pl-4 border outline-none" name="postcode_zipcode" type="text" value={formData.postcode_zipcode} onChange={handleChange}/>
          
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          <p className="text-sm ">PHONE</p>
          <input className="w-full h-10 pl-4 border outline-none" name="phone" type="text" value={formData.phone} onChange={handleChange}/>
          
        </div>
        <input className='w-full h-10 pl-4 mt-4 text-white bg-black border outline-none' type='submit' value={"PROCESSED TO BILLING"} />
      </form>
      <div className=" lg:w-[15vw] lg:mt-16">
        <div className="flex flex-col ">
          <div className="w-full px-4 py-4 mb-8 bg-white lg:w-80">
          <p>ORDER SUMMARY</p>
          <div className='flex justify-between w-full '>
          <p>YOUR CART</p> <p>${cartData.total}</p>
          </div>

           <div className='flex justify-between w-full py-8 border-t '>
          <p className='text-2xl font-bold'>ORDER TOTAL</p> <p className='text-2xl font-bold' >${cartData.total}</p>
          </div>
          </div>
           <div className="w-full px-4 py-4 bg-white lg:w-80">
     {cartData.products? cartData.products.map((e,i)=>(
                         <div key={i} className='flex pb-4 mt-4 border-b group '>

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
                    )) :<div>NO Products</div>}
     </div></div>
  
     </div>
     </div>
    

    </div>
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
    console.log(cartData)
   
   
   
   
     
     return{props:{  cartData }}
     
   
   }
   
   
   
   